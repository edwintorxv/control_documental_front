import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CiudadMunicipioService } from '../../../../core/services/ciudad-municipio.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { CiudadMunicipio } from '../../../../shared/models/ciudad-municipio.model';
import { Departamento } from '../../../../shared/models/departamento.model';
import { Estado } from '../../../../shared/models/estado.model';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { EstadoCivilService } from '../../../empleados/services/estado-civil.service';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { EstadoService } from '../../../empleados/services/estado.service';

@Component({
  selector: 'app-cliente-form-dialog',
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
  standalone: true,
  templateUrl: './cliente-form-dialog.component.html',
  styleUrl: './cliente-form-dialog.component.scss'
})

export class ClienteFormDialogComponent implements OnInit, OnChanges {

  @Output() saved = new EventEmitter<void>();
  @Input() cliente?: Cliente;
  @Input() isEditMode: boolean = false;

  lstDepartamentos: Departamento[] = [];
  lstCiudadMunicipio: CiudadMunicipio[] = [];
  lstEstado: Estado[] = [];
  clienteForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private ciudadMunicipioService: CiudadMunicipioService,
    private estadoClienteService: EstadoService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cliente"] && this.cliente) {
      this.clienteForm.patchValue({
        nombre: this.cliente.nombre,
        nit: this.cliente.nit,
        direccion: this.cliente.direccion,
        representante: this.cliente.representante,
        telefono: this.cliente.telefono,
        estado: this.cliente.estado,
        ciudadMunicipio: this.cliente.ciudadMunicipio?.id
      })
    }

    if (!this.clienteForm) return;

    if (changes['cliente'] && this.cliente) {

      this.setFormForEdit();

    }

    if (!this.cliente) {
      this.clienteForm.reset();
      this.clienteForm.get('nit')?.enable();
    }

    // Si cambia a modo crear
    if (!this.cliente) {
      this.clienteForm.reset();
    }

  }

  private setFormForEdit(): void {

    this.clienteForm.patchValue({

      nombre: this.cliente?.nombre,
      nit: this.cliente?.nit,
      direccion: this.cliente?.direccion,
      representante: this.cliente?.representante,
      telefono: this.cliente?.telefono,
      estado: this.cliente?.estado,
      ciudadMunicipio: this.cliente?.ciudadMunicipio?.id,

    });

    this.clienteForm.get('nit')?.disable();

    if (this.cliente?.ciudadMunicipio?.departamento?.id) {
      this.onDepartamentoChange(
        this.cliente.ciudadMunicipio.departamento.id
      );
    }
  }

  buildForm() {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      nit: ['', [Validators.required, Validators.maxLength(50), CustomValidators.soloNumeros]],
      direccion: ['', [Validators.required, Validators.maxLength(100), CustomValidators.direcciones]],
      representante: ['', [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      telefono: ['', [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      estado: ['', [Validators.required]],
      ciudadMunicipio: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadDepartamentos();
    this.loadEstado();
    this.buildForm();
  }

  loadDepartamentos() {
    this.departamentoService.getAll()
      .subscribe({
        next: (departamentos) => {
          this.lstDepartamentos = departamentos
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: err.tipo,
            detail: err.descripcion
          })
        }
      })
  }

  onDepartamentoChange(idDepartamento: number) {
    this.ciudadMunicipioService.getCiudadMunicipioByDepartamentoId(idDepartamento).subscribe({
      next: (data) => {
        this.lstCiudadMunicipio = data;
      },
      error: (err) => {
        console.log('Error consultando ciudadMunicipio', err);
      }
    })
  }

  loadEstado() {
    this.estadoClienteService.getAll().subscribe({
      next: (estados) => {
        this.lstEstado = estados;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: err.tipo,
          detail: err.descripcion
        })
      }
    })
  }

  saveCliente(): void {

    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formValue = this.clienteForm.getRawValue();

    const request = {
      nombre: formValue.nombre,
      nit: formValue.nit,
      direccion: formValue.direccion,
      representante: formValue.representante,
      telefono: formValue.telefono,
      estado: { id: formValue.estado },
      ciudadMunicipio: { id: formValue.ciudadMunicipio }

    };

    if (this.cliente) {
      this.updateCliente(request)
    } else {
      this.clienteForm.get('nit')?.enable();
      this.createCliente(request);
    }
  }

  private createCliente(request: any) {
    this.clienteService.postCliente(request)
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => this.handleError(error)
      });
  }

  private updateCliente(request: any) {
    this.clienteService.putCliente(this.cliente!.id, request)
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

}
