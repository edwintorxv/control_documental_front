import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DocumentoMaestroService } from '../../../../core/services/documento-maestro.service';
import { DocumentoMaestro } from '../../../../shared/models/documento-maestro.model';
import { EmpleadoFamiliar } from '../../models/empleado-familiar.model';
import { TipoFamiliar } from '../../models/tipo-familiar.model';
import { TipoFamiliarService } from '../../services/tipo-familiar.service';
import { SelectModule } from 'primeng/select';
import { CustomValidators } from '../../../../shared/validators/custom-validators';

@Component({
  selector: 'app-empleado-familiares-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    InputGroup,
    InputGroupAddonModule,
    SelectModule
  ],
  templateUrl: './empleado-familiares-dialog.component.html',
  styleUrl: './empleado-familiares-dialog.component.scss'
})

export class EmpleadoFamiliaresDialogComponent implements OnInit {

  @Input() empleadoId!: number;
  private _familiar?: EmpleadoFamiliar;
  @Input() set familiar(value: EmpleadoFamiliar | undefined) {
    this._familiar = value;
    if (this.form) {
      this.patchFormValues();
    }
  }

  get familiar(): EmpleadoFamiliar | undefined {
    return this._familiar;
  }

  //@Input() familiar?: EmpleadoFamiliar; // para edición
  @Output() saved = new EventEmitter<EmpleadoFamiliar>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  tiposFamiliares: TipoFamiliar[] = [];
  documentoMaestro: DocumentoMaestro[] = [];

  constructor(
    private fb: FormBuilder,
    private tipoFamiliarService: TipoFamiliarService,
    private documentoMaestroService: DocumentoMaestroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadTiposFamiliares();
    this.loadDocumentos();
    if (this.familiar) {
      this.patchFormValues();
    }
  }

  private patchFormValues(): void {
    if (!this.familiar) {
      this.form.reset();
      this.form.get('numeroIdentificacion')?.enable(); // 👈 modo creación
      return;
    }
    this.form.patchValue({
      nombre: this.familiar.nombre,
      apellido: this.familiar.apellido,
      documentoMaestro: this.familiar.documentoMaestro?.id,
      numeroIdentificacion: this.familiar.numeroIdentificacion,
      numeroTelefono: this.familiar.numeroTelefono,
      tipoFamiliar: this.familiar.tipoFamiliar?.id,
      viveConEmpleado: this.familiar.viveConEmpleado
    });
    this.form.get('numeroIdentificacion')?.disable(); // 👈 modo edición
  }

  buildForm(): void {
    this.form = this.fb.group({
      nombre: [null, [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      apellido: [null, [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      documentoMaestro: [null, [Validators.required]],
      numeroIdentificacion: [null, [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      numeroTelefono: [null, [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      tipoFamiliar: [null, [Validators.required]],
      viveConEmpleado: [false]
    });
  }

  loadTiposFamiliares(): void {
    this.tipoFamiliarService.getTipoFamiliar().subscribe({
      next: (data) => this.tiposFamiliares = data,
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los tipos de familiar'
      })
    });
  }

  loadDocumentos(): void {
    this.documentoMaestroService.getDocumentoMaestroById(1).subscribe({
      next: (data) => this.documentoMaestro = data,
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los documentos'
      })
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const familiarData: any = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      numeroIdentificacion: formValue.numeroIdentificacion,
      numeroTelefono: formValue.numeroTelefono,
      viveConEmpleado: formValue.viveConEmpleado,
      documentoMaestro: { id: formValue.documentoMaestro },
      tipoFamiliar: { id: formValue.tipoFamiliar },
      empleado: { id: this.empleadoId }
    };
    if (this.familiar && this.familiar.id) {
      familiarData.id = this.familiar.id;
    }

    this.saved.emit(familiarData);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

}