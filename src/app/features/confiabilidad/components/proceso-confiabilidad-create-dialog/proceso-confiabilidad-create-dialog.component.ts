import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { CiudadMunicipioService } from '../../../../core/services/ciudad-municipio.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { DocumentoMaestroService } from '../../../../core/services/documento-maestro.service';
import { ResponseHandlerUtil } from '../../../../core/utils/response-handler.util';
import { CiudadMunicipio } from '../../../../shared/models/ciudad-municipio.model';
import { Departamento } from '../../../../shared/models/departamento.model';
import { DocumentoMaestro } from '../../../../shared/models/documento-maestro.model';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { Cliente } from '../../../clientes/models/cliente.model';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ProcesoConfiabilidad } from '../../models/proceso-confiabilidad.model';
import { ProcesoConfiabilidadService } from '../../services/proceso-confiabilidad.service';


@Component({
  selector: 'app-proceso-confiabilidad-create-dialog',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule,
    FluidModule,
    ReactiveFormsModule
  ],
  templateUrl: './proceso-confiabilidad-create-dialog.component.html',
  styleUrl: './proceso-confiabilidad-create-dialog.component.scss'
})
export class ProcesoConfiabilidadCreateDialogComponent implements OnInit {

  @Input() clienteId!: number;
  @Output() saved = new EventEmitter<ProcesoConfiabilidad>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() update = new EventEmitter<any>();


  //private _procesoConfiabilidad?: ProcesoConfiabilidad;

  lstDocumentoMaestro: DocumentoMaestro[] = [];
  lstDepartamento: Departamento[] = []
  lstCiudadMunicipio: CiudadMunicipio[] = [];
  lstClientes: Cliente[] = [];

  formGroupConfiabilidad!: FormGroup;

  constructor(
    private documentoMaestroService: DocumentoMaestroService,
    private messageService: MessageService,
    private departamentoService: DepartamentoService,
    private ciudadMunicipioService: CiudadMunicipioService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private procesoConfiabilidadService: ProcesoConfiabilidadService
  ) { }


  ngOnInit(): void {
    this.buildForm();
    this.loadDocumentoMaestro();
    this.loadDepartamento();
    this.loadClientes();
  }

  buildForm(): void {

    this.formGroupConfiabilidad = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      apellido: [null, [Validators.required, Validators.maxLength(50), CustomValidators.soloLetras]],
      identificacion: [null, [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      ciudadMunicipio: [null, [Validators.required]],
      direccion: [null, [Validators.required, Validators.maxLength(100), CustomValidators.direcciones]],
      telefono: [null, [Validators.required, Validators.maxLength(10), CustomValidators.soloNumeros]],
      cliente: [null, [Validators.required]],
      documentoMaestro: [null, [Validators.required]]
    })

  }

  saveProcesoConfiabilidad(): void {

    if (this.formGroupConfiabilidad.invalid) {
      this.formGroupConfiabilidad.markAllAsTouched();
      return;
    }

    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const formValue = this.formGroupConfiabilidad.getRawValue();

    const procesoCofiabilidadData: any = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      identificacion: formValue.identificacion,
      direccion: formValue.direccion,
      telefono: formValue.telefono,

      fechaSolicitud: fechaFormateada,
      fechaCreacion: fechaFormateada,
      ciudadMunicipio: { id: formValue.ciudadMunicipio },
      documentoMaestro: { id: formValue.documentoMaestro },
      cliente: { id: formValue.cliente },
      estadoProceso: 'C'

    };

    this.crearProcesoConfiabilidad(procesoCofiabilidadData)

  }

  crearProcesoConfiabilidad(request: any) {

    this.procesoConfiabilidadService.postProcesoCliente(request).subscribe({
      next: (response) => {
        ResponseHandlerUtil.handleResponse(response, this.messageService)
        this.saved.emit();
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
      }
    })
  }

  loadDocumentoMaestro() {
    this.documentoMaestroService.getDocumentoMaestroById([2])
      .subscribe({
        next: (documentoMaetro) => {
          this.lstDocumentoMaestro = documentoMaetro
        },
        error: (err) => {
          ResponseHandlerUtil.handleError(err, this.messageService)
        }
      })
  }

  loadDepartamento() {
    this.departamentoService.getAll().subscribe({
      next: (departamentoData) => {
        this.lstDepartamento = departamentoData;
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService);
      }
    });

  }

  onDepartamentoChange(idDepartamento: number) {
    this.ciudadMunicipioService.getCiudadMunicipioByDepartamentoId(idDepartamento)
      .subscribe({
        next: (ciudadMunicipioData) => {
          this.lstCiudadMunicipio = ciudadMunicipioData;
        },
        error: (err) => {
          ResponseHandlerUtil.handleError(err, this.messageService)
        }
      })
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.lstClientes = data
      }
    })
  }

}
