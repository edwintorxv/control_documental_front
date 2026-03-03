import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from "primeng/floatlabel";
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Empleado } from '../../models/empleado.model';
import { MessageService } from 'primeng/api';
import { EmpleadoExperienciaLaboral } from '../../models/empleado-experiencia-laboral.model';

@Component({
  selector: 'app-empleado-experiencia-laboral-dialog',
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule,
    FluidModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './empleado-experiencia-laboral-dialog.component.html',
  styleUrl: './empleado-experiencia-laboral-dialog.component.scss'
})

export class EmpleadoExperienciaLaboralDialogComponent implements OnInit {

  @Input() empleadoId!: number;
  private _experienciaLaboral?: EmpleadoExperienciaLaboral;

  @Input() set experienciaLaboral(value: EmpleadoExperienciaLaboral | undefined) {
    this._experienciaLaboral = value;

    if (value && this.empleadoExperienciaForm) {
      this.patchFormValues();
    }
  };

  get experienciaLaboral(): EmpleadoExperienciaLaboral | undefined {
    return this._experienciaLaboral;
  }

  @Output() saved = new EventEmitter<EmpleadoExperienciaLaboral>();
  @Output() cancelled = new EventEmitter<void>();

  empleadoExperienciaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    if (this.experienciaLaboral) {
      this.patchFormValues();
    }

  }

  private patchFormValues(): void {
    if (!this.experienciaLaboral) {
      this.empleadoExperienciaForm.reset();
      return;
    }
    this.empleadoExperienciaForm.patchValue({
      nombreEmpresa: this.experienciaLaboral.nombreEmpresa,
      direccionEmpresa: this.experienciaLaboral.direccionEmpresa,
      telefono: this.experienciaLaboral.telefono,
      nombreJefeDirecto: this.experienciaLaboral.nombreJefeDirecto,
      cargoDesempenio: this.experienciaLaboral.cargoDesempenio,
      fechaIngreso: this.experienciaLaboral.fechaIngreso,
      fechaRetiro: this.experienciaLaboral.fechaRetiro
    });
  }

  buildForm(): void {
    this.empleadoExperienciaForm = this.formBuilder.group({
      nombreEmpresa: [null, [Validators.required, Validators.maxLength(100)]],
      direccionEmpresa: [null, [Validators.required, Validators.maxLength(100)]],
      telefono: [null, [Validators.required, Validators.maxLength(10)]],
      nombreJefeDirecto: [null, [Validators.required, Validators.maxLength(100)]],
      cargoDesempenio: [null, [Validators.required, Validators.maxLength(50)]],
      fechaIngreso: [null, [Validators.required]],
      fechaRetiro: [null, [Validators.required]]
    });
  }

  onSubmit(): void {

    console.log('Submit ejecutado');

    if (this.empleadoExperienciaForm.invalid) {
      console.log('Formulario inválido', this.empleadoExperienciaForm);
      this.empleadoExperienciaForm.markAllAsTouched();
      return;
    }
    console.log('Formulario válido', this.empleadoExperienciaForm.value);
    const formValue = this.empleadoExperienciaForm.value;
    const experienciaLaboralData: any = {
      nombreEmpresa: formValue.nombreEmpresa,
      direccionEmpresa: formValue.direccionEmpresa,
      telefono: formValue.telefono,
      nombreJefeDirecto: formValue.nombreJefeDirecto,
      cargoDesempenio: formValue.cargoDesempenio,
      fechaIngreso: formValue.fechaIngreso,
      fechaRetiro: formValue.fechaRetiro,
      empleado: { id: this.empleadoId }
    };

    // Si estamos editando, agregamos el id del trabajo
    if (this.experienciaLaboral && this.experienciaLaboral.id) {
      experienciaLaboralData.id = this.experienciaLaboral.id;

      console.log('Cargando', this.experienciaLaboral && this.experienciaLaboral.id)
    }

    this.saved.emit(experienciaLaboralData);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

}