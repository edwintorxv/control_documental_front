import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FileUpload } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ResponseHandlerUtil } from '../../../../core/utils/response-handler.util';
import { Concepto } from '../../models/concepto.model';
import { ProcesoConfiabilidad } from '../../models/proceso-confiabilidad.model';
import { ConceptoService } from '../../services/concepto.service';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { ProcesoConfiabilidadService } from '../../services/proceso-confiabilidad.service';
import { ProfesionalConfiabilidad } from '../../models/profesional-confiabilidad.model';
import { ProfesionalConfiabilidadService } from '../../services/profesional-confiabilidad.service';
import { AlmacenamientoService } from '../../../../core/services/almacenamiento.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-proceso-confiabilidad-update-dialog',
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
    ReactiveFormsModule,
    FileUpload,
    TextareaModule
  ],
  standalone: true,
  templateUrl: './proceso-confiabilidad-update-dialog.component.html',
  styleUrl: './proceso-confiabilidad-update-dialog.component.scss'
})

export class ProcesoConfiabilidadUpdateDialogComponent implements OnInit, OnChanges {

  lstConceptos: Concepto[] = [];
  formGroupConfiabilidadUpdate!: FormGroup;
  lstProfesionalConfiabilidad: ProfesionalConfiabilidad[] = [];
  selectedFile!: File;

  @Input() proceso?: ProcesoConfiabilidad;
  @Output() saved = new EventEmitter<void>();

  constructor(
    private conceptoService: ConceptoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confiabilidadService: ProcesoConfiabilidadService,
    private profesionalConfiabilidadService: ProfesionalConfiabilidadService,
    private almacenamientoService: AlmacenamientoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.loadConcepto();
    this.loadProfesionalConfiabilidad();
    this.buildForm();
  }

  buildForm(): void {

    this.formGroupConfiabilidadUpdate = this.formBuilder.group({
      concepto: [null, [Validators.required]],
      profesional: [null, [Validators.required]],
      ampliacion: [null, [Validators.required, Validators.maxLength(25000), CustomValidators.ampliacion]]
    })
  }

  loadConcepto() {
    this.conceptoService.getConceptos().subscribe({
      next: (response) => {
        this.lstConceptos = response.conceptoResponse.lstConcepto
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
      }
    })
  }

  loadProfesionalConfiabilidad() {
    this.profesionalConfiabilidadService.getProfesionalesConfiabilidad()
      .subscribe({
        next: (profesional) => {
          const data = profesional.profesionalConfiabilidadResponse.lstProfesionaConfiabilidad;
          this.lstProfesionalConfiabilidad = data.map(p => ({
            ...p,
            nombreProfesional: `${p.empleado.nombre} ${p.empleado.apellido}`
          }));
        },
        error: (err) => [
          ResponseHandlerUtil.handleError(err, this.messageService)
        ]
      })
  }

  saveProcesoConfiabilidad() {

    if (this.formGroupConfiabilidadUpdate.invalid || !this.selectedFile) {
      console.log('Valido?', this.formGroupConfiabilidadUpdate.value)
      console.log("Formulario inválido:", this.formGroupConfiabilidadUpdate.invalid);
      console.log("Archivo seleccionado:", this.selectedFile);
      return;
    }

    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];

    const formValue = this.formGroupConfiabilidadUpdate.getRawValue();

    const procesoCofiabilidadDataUpdate: any = {

      nombre: this.proceso?.nombre,
      apellido: this.proceso?.apellido,
      identificacion: this.proceso?.identificacion,
      telefono: this.proceso?.telefono,
      fechaSolicitud: this.proceso?.fechaSolicitud,
      fechaAtencion: fechaFormateada,
      ampliacion: formValue.ampliacion,
      estadoProceso: 'C',
      fechaCreacion: this.proceso?.fechaCreacion,
      nombreArchivo: this.selectedFile.name,
      ciudadMunicipio: this.proceso?.ciudadMunicipio,
      direccion: this.proceso?.direccion,

      concepto: { id: formValue.concepto },
      profesionalConfiabilidad: { id: formValue.profesional },
      documentoMaestro: { id: this.proceso?.documentoMaestro.id },
      cliente: { id: this.proceso?.cliente.id }

    };
    this.actualizarProcesoConfiabilidad(procesoCofiabilidadDataUpdate)
  }

  actualizarProcesoConfiabilidad(procesoConfiabilidadUpdate: any) {

    const clientes = 'Clientes';
    const cliente = this.proceso?.cliente.nit;
    const confiabilidad = 'Confiabilidad';
    const empleado = this.proceso?.identificacion;

    const rutaCliente = `${clientes}/${cliente}/${confiabilidad}/${empleado}`;
    const idProceso = this.proceso?.id;

    this.confiabilidadService
      .putProcesoConfiabildiad(idProceso, procesoConfiabilidadUpdate)
      .pipe(
        switchMap((procesoActualizado) => {
          ResponseHandlerUtil.handleResponse(procesoActualizado, this.messageService);
          return this.almacenamientoService.crearCarpeta(rutaCliente);
        }),
        switchMap((rutaCreada) => {
          const ruta = rutaCreada.url;
          return this.almacenamientoService.cargarArchivo(ruta, this.selectedFile)
            .pipe(
              map(() => ruta)
            );
        }),
        switchMap((ruta) => {
          const rutaArchivo = `${ruta}/${this.selectedFile.name}`.replace(/\\/g, '/');
          return this.confiabilidadService.putUrlArchivo(idProceso, rutaArchivo);
        })
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Proceso actualizado',
            detail: 'Proceso actualizado correctamente'
          });
          this.saved.emit();
        },
        error: (err) => {
          ResponseHandlerUtil.handleError(err, this.messageService);
        }
      });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
  }

}
