import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EmpleadoExperienciaLaboralService } from '../services/empleado-experiencia-laboral.service';
import { EmpleadoExperienciaLaboral } from '../models/empleado-experiencia-laboral.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmpleadoExperienciaLaboralDialogComponent } from '../components/empleado-experiencia-laboral-dialog/empleado-experiencia-laboral-dialog.component';

@Component({
  selector: 'app-empleado-experiencia-laboral-table',
  standalone: true,
  imports: [
    CardModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    EmpleadoExperienciaLaboralDialogComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './empleado-experiencia-laboral-table.component.html',
  styleUrl: './empleado-experiencia-laboral-table.component.scss'
})

export class EmpleadoExperienciaLaboralTableComponent implements OnInit {

  empleadoId!: number;
  empleadoExperienciaLaboral: EmpleadoExperienciaLaboral[] = [];
  displayDialog = false;
  laboralEdit?: EmpleadoExperienciaLaboral; // para edición

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoExperienciaLaboralService: EmpleadoExperienciaLaboralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadExperienciaLaboral();
  }

  loadExperienciaLaboral() {
    this.empleadoExperienciaLaboralService.getExperienciaLaboral(this.empleadoId).subscribe({
      next: (respuesta) => {
        if (respuesta.metadata && respuesta.metadata.length > 0) {
          const metaData = respuesta.metadata[0];
          if (metaData.codigo !== '00') {
            this.messageService.add({
              severity: 'warn',
              summary: metaData.tipo,
              detail: metaData.descripcion,
              life: 4000
            });
          }
        }

        this.empleadoExperienciaLaboral = respuesta.empleadoLaboralResponse.lstEmpleadoLaboral;

      },
      error: (err) => {
        console.error('Error en la petición:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los familiares',
          life: 4000
        });
      }
    });
  }

  openCreateDialog() {
    this.laboralEdit = undefined; // modo creación
    this.displayDialog = true;
  }

  onDialogHide() {
    this.displayDialog = false;
    this.laboralEdit = undefined;
  }

  openEditDialog(experiencaLaboral: EmpleadoExperienciaLaboral) {
    this.laboralEdit = experiencaLaboral;
    console.log('intenta editar:', this.laboralEdit.id)
    this.displayDialog = true;
  }

  onSaved(experienciaLaboralData: any) {
    console.log('On saved')
    if (this.laboralEdit) {
      // Actualizar
      this.empleadoExperienciaLaboralService.putExperienciaLaboral(this.laboralEdit.id!, experienciaLaboralData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Experiencia actualizada correctamente'
          });
          this.loadExperienciaLaboral();
          this.onDialogHide();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      // Crear
      this.empleadoExperienciaLaboralService.postExperienciaLaboral(experienciaLaboralData).subscribe({
        next: (response) => {
          console.log('Respuesta al crear: ', response)
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Experiencia creada correctamente',
            life: 4000
          });

          this.loadExperienciaLaboral(); // ✅ Recargar
          this.onDialogHide();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  handleError(err: any) {
    console.error('Error completo:', err); // Para depurar
    const metadata = err.error?.metadata?.[0];
    this.messageService.add({
      severity: 'error',
      summary: metadata?.tipo || 'Error',
      detail: metadata?.descripcion || 'Ocurrió un error inesperado'
    });
  }

  confirmDelete(experienciaLaboral: EmpleadoExperienciaLaboral) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a: ${experienciaLaboral.nombreEmpresa}?`,
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
        this.deleteExperienciaLaboral(experienciaLaboral.id!);
      }
    });
  }

  // método que llama al servicio
  deleteExperienciaLaboral(id: number) {
    this.empleadoExperienciaLaboralService.deleteExperienciaLaboral(id).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado',
          detail: 'Se ha eliminado el registro',
          life: 4000
        });
        this.loadExperienciaLaboral();
      },
      error: (err) => this.handleError(err)
    });
  }
  onCancelled() {
    this.onDialogHide();
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }
}