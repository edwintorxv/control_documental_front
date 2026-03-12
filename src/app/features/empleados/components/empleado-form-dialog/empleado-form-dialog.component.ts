import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from "primeng/floatlabel";
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CiudadMunicipioService } from '../../../../core/services/ciudad-municipio.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { DocumentoMaestroService } from '../../../../core/services/documento-maestro.service';
import { CiudadMunicipio } from '../../../../shared/models/ciudad-municipio.model';
import { Departamento } from '../../../../shared/models/departamento.model';
import { DocumentoMaestro } from '../../../../shared/models/documento-maestro.model';
import { Estado } from '../../../../shared/models/estado.model';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { Cargo } from '../../models/cargo.model';
import { Empleado } from '../../models/empleado.model';
import { EstadoCivil } from '../../models/estado-civil.model';
import { NivelAcademico } from '../../models/nivel-academico.model';
import { CargoService } from '../../services/cargo.service';
import { EmpleadoService } from '../../services/empleado.service';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { EstadoService } from '../../services/estado.service';
import { NivelAcademicoService } from '../../services/nivel-academico.service';

@Component({
  selector: 'app-empleado-form-dialog',
  standalone: true,
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
  templateUrl: './empleado-form-dialog.component.html',
  styleUrl: './empleado-form-dialog.component.scss'
})

export class EmpleadoFormDialogComponent implements OnChanges, OnInit {

  @Output() saved = new EventEmitter<void>();
  @Input() empleado?: Empleado;
  @Input() isEditMode: boolean = false;

  departamentos: Departamento[] = [];
  ciudadMunicipio: CiudadMunicipio[] = [];
  documentoMaestro: DocumentoMaestro[] = [];
  estadoCivil: EstadoCivil[] = [];
  cargo: Cargo[] = [];
  estado: Estado[] = [];
  nivelAcademico: NivelAcademico[] = [];
  empleadoForm!: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private ciudadMunicipioService: CiudadMunicipioService,
    private documentoMaestroService: DocumentoMaestroService,
    private estadoCivilService: EstadoCivilService,
    private cargoService: CargoService,
    private estadoService: EstadoService,
    private empleadoService: EmpleadoService,
    private nivelAcademicoService: NivelAcademicoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['empleado'] && this.empleado) {
      this.empleadoForm.patchValue({
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        numeroIdentificacion: this.empleado.numeroIdentificacion,
        direccionResidencia: this.empleado.direccionResidencia,
        numeroTelefono: this.empleado.numeroTelefono,
        fechaNacimiento: this.empleado.fechaNacimiento,
        fechaIngreso: this.empleado.fechaIngreso,
        fechaRetiro: this.empleado.fechaRetiro,

        documentoMaestro: this.empleado.documentoMaestro?.id,
        ciudadMunicipio: this.empleado.ciudadMunicipio?.id,
        estadoCivil: this.empleado.estadoCivil?.id,
        cargo: this.empleado.cargo?.id,
        estado: this.empleado.estado?.id,
        nivelAcademico: this.empleado.nivelAcademico?.id
      });
    }

    if (!this.empleadoForm) return;

    if (changes['empleado'] && this.empleado) {

      this.setFormForEdit();

    }

    if (!this.empleado) {
      this.empleadoForm.reset();
      this.empleadoForm.get('numeroIdentificacion')?.enable(); // 👈 modo creación
    }

    // Si cambia a modo crear
    if (!this.empleado) {
      this.empleadoForm.reset();
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadDepartamento();
    this.loadDocumentoMaestro();
    this.loadEstadoCivil();
    this.loadCargo();
    this.loadEstado();
    this.loadNivelAcademico();
  }

  loadDepartamento() {
    this.departamentoService.getAll().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => {
        console.log('Error cargando los departamentos', err);
      }
    });

  }

  onDepartamentoChange(idDepartamento: number) {
    this.ciudadMunicipioService.getCiudadMunicipioByDepartamentoId(idDepartamento)
      .subscribe({
        next: (data) => {
          this.ciudadMunicipio = data;
        },
        error: (err) => {
          console.log('Error consultando ciudadMunicipio', err);
        }
      })
  }

  loadDocumentoMaestro() {
    this.documentoMaestroService.getDocumentoMaestroById([1])
      .subscribe({
        next: (data) => {
          this.documentoMaestro = data;
        },
        error: (err) => {
          console.log('Error al consultar documento Maestro', err)
        }
      })
  }

  loadEstadoCivil() {
    this.estadoCivilService.getAll()
      .subscribe({
        next: (data) => {
          this.estadoCivil = data;
        },
        error: (err) => {
          console.log('Error al consultar estado civil', err)
        }
      })
  }

  loadCargo() {
    this.cargoService.getAll()
      .subscribe({
        next: (data) => {
          this.cargo = data;
        },
        error: (err) => {
          console.log('Error al cargar Cargos', err)
        }
      })
  }

  loadEstado() {
    this.estadoService.getAll()
      .subscribe({
        next: (data) => {
          this.estado = data
        },
        error: (err) => {
          console.log('Error al cargar Estado', err)
        }
      })
  }

  loadNivelAcademico() {
    this.nivelAcademicoService.getAll()
      .subscribe({
        next: (data) => {
          this.nivelAcademico = data;
        },
        error: (err) => {
          console.log('Error al cargar Niel academico', err)
        }
      })
  }

  buildForm() {
    this.empleadoForm = this.formBuilder.group({

      nombre: ['', [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      apellido: ['', [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      documentoMaestro: [null, [Validators.required]],
      numeroIdentificacion: ['', [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      ciudadMunicipio: [null, [Validators.required]],
      direccionResidencia: [null, [Validators.required, Validators.maxLength(100), CustomValidators.direcciones]],
      numeroTelefono: [null, [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      nivelAcademico: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      estado: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      fechaRetiro: [null]

    });
  }

  saveEmpleado(): void {

    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    const formValue = this.empleadoForm.getRawValue();

    const request = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      numeroIdentificacion: formValue.numeroIdentificacion,
      direccionResidencia: formValue.direccionResidencia,
      numeroTelefono: formValue.numeroTelefono,
      fechaNacimiento: formValue.fechaNacimiento,
      fechaIngreso: formValue.fechaIngreso,
      fechaRetiro: formValue.fechaRetiro,

      documentoMaestro: { id: formValue.documentoMaestro },
      ciudadMunicipio: { id: formValue.ciudadMunicipio },
      nivelAcademico: { id: formValue.nivelAcademico },
      estadoCivil: { id: formValue.estadoCivil },
      cargo: { id: formValue.cargo },
      estado: { id: formValue.estado }
    };

    if (this.empleado) {
      this.updateEmpleado(request)
    } else {
      this.empleadoForm.get('numeroIdentificacion')?.enable();
      this.createEmpleado(request);
    }
  }

  private createEmpleado(request: any) {
    this.empleadoService.postEmpleado(request)
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
  }

  private updateEmpleado(request: any) {
    this.empleadoService.putEmpleado(this.empleado!.id, request)
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
  }

  private handleError(error: any) {
    if (error.error && error.error.metadata && error.error.metadata.length > 0) {
      const metaData = error.error.metadata[0];
      this.messageService.add({
        severity: 'error',
        summary: metaData.tipo || 'Error',
        detail: metaData.descripcion || 'Ocurrió un error'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en la comunicación con el servidor'
      });
    }
  }

  private handleResponse(response: any) {

    const metaData = response.metadata?.[0];

    if (metaData?.codigo === "00") {

      this.messageService.add({
        severity: 'success',
        summary: metaData.tipo,
        detail: metaData.descripcion
      });

      this.saved.emit();

    } else {

      this.messageService.add({
        severity: 'warn',
        summary: metaData?.tipo,
        detail: metaData?.descripcion
      });
    }
  }

  private setFormForEdit(): void {

    this.empleadoForm.patchValue({
      nombre: this.empleado?.nombre,
      apellido: this.empleado?.apellido,
      numeroIdentificacion: this.empleado?.numeroIdentificacion,
      direccionResidencia: this.empleado?.direccionResidencia,
      numeroTelefono: this.empleado?.numeroTelefono,
      fechaNacimiento: this.empleado?.fechaNacimiento,
      fechaIngreso: this.empleado?.fechaIngreso,
      fechaRetiro: this.empleado?.fechaRetiro,

      documentoMaestro: this.empleado?.documentoMaestro?.id,
      ciudadMunicipio: this.empleado?.ciudadMunicipio?.id,
      nivelAcademico: this.empleado?.nivelAcademico?.id,
      estadoCivil: this.empleado?.estadoCivil?.id,
      cargo: this.empleado?.cargo?.id,
      estado: this.empleado?.estado?.id

    });

    this.empleadoForm.get('numeroIdentificacion')?.disable();

    if (this.empleado?.ciudadMunicipio?.departamento?.id) {
      this.onDepartamentoChange(
        this.empleado.ciudadMunicipio.departamento.id
      );
    }
  }

}
