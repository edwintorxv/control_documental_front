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
import { DocumentoMaestro } from '../../../shared/models/documento-maestro.model';
import { EmpleadoDocumentosDialogComponent } from '../components/empleado-documentos-dialog/empleado-documentos-dialog.component';
import { EmpleadoDocumento } from '../models/empleado-documento.model';
import { EmpleadoDocumentoService } from '../services/empleado-documento.service';

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
    EmpleadoDocumentosDialogComponent
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

  displayDialog = false;
  documentoEdit?: EmpleadoDocumento; // para edición

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoDocumentoService: EmpleadoDocumentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'))
    this.loadDocumentosEmpleado();
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

  onSaved(empleadoDocumento: any) {
    this.empleadoDocumentoService.postEmpleadoDocumento(empleadoDocumento).subscribe({
      next: (respuesta) => {
        this.messageService.add({
          severity: 'success',
          summary: respuesta.metadata[0].tipo,
          detail: 'Documento creado y cargado correctamente',
          life: 4000
        })
        this.loadDocumentosEmpleado(); // ✅ Recargar
        this.onDialogHide();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err.error.metadata[0].tipo,
          detail: err.error.metadata[0].descripcion,
          life: 4000
        })

        this.loadDocumentosEmpleado(); // ✅ Recargar
        this.onDialogHide();
      }
    })
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
      next: (response) => {
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
    this.documentoEdit = undefined; // modo creación
    this.displayDialog = true;
  }

  onDialogHide() {
    this.displayDialog = false;
    this.documentoEdit = undefined;
  }

  onCancelled() {
    this.onDialogHide();
  }

}
