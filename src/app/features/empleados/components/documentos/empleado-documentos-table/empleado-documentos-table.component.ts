import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DocumentoMaestro } from '../../../../../shared/models/documento-maestro.model';
import { EmpleadoDocumentosDialogComponent } from '../empleado-documentos-dialog/empleado-documentos-dialog.component';
import { EmpleadoDocumento } from '../../../models/empleado-documento.model';
import { EmpleadoDocumentoService } from '../../../services/empleado-documento.service';
import { AlmacenamientoService } from '../../../../../core/services/almacenamiento.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../models/empleado.model';
import { PdfViewerComponent } from '../../../../../shared/components/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-empleado-documentos-table',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    EmpleadoDocumentosDialogComponent,
    PdfViewerComponent,
    PdfViewerModule
  ],
  providers: [ConfirmationService],
  standalone: true,
  templateUrl: './empleado-documentos-table.component.html',
  styleUrl: './empleado-documentos-table.component.scss'
})
export class EmpleadoDocumentosTableComponent implements OnInit {

  empleadoId!: number;
  empleadoDocumento: EmpleadoDocumento[] = [];
  documentoMaestro: DocumentoMaestro[] = [];
  empleadoData: Empleado[] = [];
  cedulaEmpleado: string = '';
  idDocumento: number = 0;
  rutaPdf: string = '';
  visiblePdf = false;
  displayDialog = false;
  documentoEdit?: EmpleadoDocumento;
  tipoDocumento: any = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoDocumentoService: EmpleadoDocumentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private almacenamientoService: AlmacenamientoService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'))
    this.loadDocumentosEmpleado();
    this.buscarEmpleado();
  }

  loadDocumentosEmpleado() {
    this.empleadoDocumentoService.getEmpleadoDocumento(this.empleadoId).subscribe({
      next: (response) => {
        if (response.metadata && response.metadata.length > 0) {
          const metaData = response.metadata[0];
          if (metaData.codigo !== "00") {
            this.messageService.add({
              severity: 'warn',
              summary: metaData.tipo,
              detail: metaData.descripcion,
              life: 4000
            });
          }
        }
        this.empleadoDocumento = response.empleadoDocumentoResponse.lstEmpleadoDocumento;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: err.error.metaData.descripcion,
          detail: 'Aún no se han creado documentos para este empleado',
          life: 4000
        });
      }
    })
  }

  buscarEmpleado() {
    this.empleadoService.findByEmpleadoId(this.empleadoId).subscribe({
      next: (response) => {
        this.cedulaEmpleado = response[0].numeroIdentificacion;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: err.error.metaData.descripcion,
          detail: 'El empleado no tiene numero de cedula',
          life: 4000
        });
      }
    })
  }

  onSaved(event: { documento: EmpleadoDocumento, archivo: File, tipoDocumento: string }) {

    const documento = event.documento;
    const archivo = event.archivo;
    const tipo = event.tipoDocumento;

    this.empleadoDocumentoService.postEmpleadoDocumento(documento)
      .subscribe({
        next: (respuesta) => {
          const metaData = respuesta.metadata[0];
          if (metaData.codigo !== '00') {
            return;
          }
          const idDocumento = respuesta.empleadoDocumentoResponse.empleadoDocumento?.id;
          const nombreCarpeta = `${this.cedulaEmpleado}/${tipo}`;
          this.almacenamientoService.crearCarpeta(nombreCarpeta)
            .subscribe({
              next: (carpetaRespuesta) => {
                const ruta = carpetaRespuesta.url;
                this.almacenamientoService.cargarArchivo(ruta, archivo)
                  .subscribe({
                    next: (cargaArchivo: any) => {
                      const metaDataArchivo = cargaArchivo.metadata[0];
                      this.messageService.add({
                        severity: 'info',
                        summary: metaDataArchivo.tipo,
                        detail: metaDataArchivo.descripcion,
                        life: 4000
                      });
                      const rutaArchivo = `${ruta}/${archivo.name}`.replace(/\\/g, '/');
                      this.empleadoDocumentoService
                        .editarRutaDocumento(idDocumento, rutaArchivo)
                        .subscribe({
                          next: () => {
                            this.loadDocumentosEmpleado();
                            this.onDialogHide();
                          },
                          error: (err) => {
                            this.handleError(err);
                          }
                        });
                    },
                    error: (err) => {
                      this.handleError(err);
                    }
                  });
              },
              error: (err) => {
                this.handleError(err);
              }
            });
        },
        error: (err) => {
          this.handleError(err);
        }
      });

  }

  confirmDelete(documento: EmpleadoDocumento) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a: ${documento.documentoMaestro.nombre}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'success'
      },
      acceptButtonProps: {
        label: 'Si',
        severity: 'danger',
      },
      accept: () => {
        this.deleteDocumento(documento.id!);
      }
    });
  }

  deleteDocumento(id: number) {
    this.empleadoDocumentoService.deleteEmpleadoDocumento(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado',
          detail: 'Se ha eliminado el registro',
          life: 4000
        });
        this.loadDocumentosEmpleado();
      },
      error: (err) => this.handleError(err)
    });
  }

  handleError(err: any) {

    const metadata = err.error?.metadata?.[0];
    this.messageService.add({
      severity: 'error',
      summary: metadata?.tipo || 'Error',
      detail: metadata?.descripcion || 'Ocurrió un error inesperado'

    });
  }

  volver(): void {

    this.router.navigate(['/empleados']);

  }

  openCreateDialog() {

    this.documentoEdit = undefined;
    this.displayDialog = true;

  }

  onDialogHide() {

    this.displayDialog = false;
    this.documentoEdit = undefined;

  }

  onCancelled() {

    this.onDialogHide();

  }

  verDocumento(data: any) {

    this.empleadoDocumentoService.getEmpleadoDocumentoPorId(data.id).subscribe({
      next: (documentoData) => {
        const pathPdf: string | any = documentoData
          .empleadoDocumentoResponse
          .empleadoDocumento
          ?.urlArchivo;

        const partes = pathPdf.split('/');

        const nombreArchivo = partes.pop();
        const ruta = partes.join('/');
        const documentoTipo = documentoData
          .empleadoDocumentoResponse
          .empleadoDocumento
          ?.documentoMaestro
          .nombre

        this.rutaPdf = this.almacenamientoService.verArchivo(ruta, nombreArchivo);

        this.tipoDocumento = documentoTipo

        this.visiblePdf = true;
      }

    })
  }

}