import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EmpleadoExperienciaLaboralService } from '../../../services/empleado-experiencia-laboral.service';
import { EmpleadoExperienciaLaboral } from '../../../models/empleado-experiencia-laboral.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmpleadoExperienciaLaboralDialogComponent } from '../empleado-experiencia-laboral-dialog/empleado-experiencia-laboral-dialog.component';
import { ResponseHandlerUtil } from '../../../../../core/utils/response-handler.util';

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
        this.empleadoExperienciaLaboral = respuesta.empleadoLaboralResponse.lstEmpleadoLaboral;
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
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
    this.displayDialog = true;
  }

  onSaved(experienciaLaboralData: any) {
    if (this.laboralEdit) {
      // Actualizar
      this.empleadoExperienciaLaboralService.putExperienciaLaboral(this.laboralEdit.id!, experienciaLaboralData).subscribe({
        next: (response) => {
          ResponseHandlerUtil.handleResponse(response, this.messageService)
          this.loadExperienciaLaboral();
          this.onDialogHide();
        },
        error: (error) => {
          ResponseHandlerUtil.handleError(error, this.messageService)
        }
      });
    } else {
      // Crear
      this.empleadoExperienciaLaboralService.postExperienciaLaboral(experienciaLaboralData).subscribe({
        next: (response) => {
          ResponseHandlerUtil.handleResponse(response, this.messageService)
        },
        error: (error) => {
          ResponseHandlerUtil.handleError(error, this.messageService)
        }
      });
    }
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

        ResponseHandlerUtil.handleResponse(response, this.messageService)
        this.loadExperienciaLaboral();
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
      }
    });
  }

  onCancelled() {
    this.onDialogHide();
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }
}