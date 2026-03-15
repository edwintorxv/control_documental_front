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
import { EmpleadoFamiliar } from '../../../models/empleado-familiar.model';
import { EmpleadoFamiliarService } from '../../../services/empleado-familiar.service';
import { EmpleadoFamiliaresDialogComponent } from '../empleado-familiares-dialog/empleado-familiares-dialog.component';
import { ResponseHandlerUtil } from '../../../../../core/utils/response-handler.util';



@Component({
  selector: 'app-empleado-familiares-table',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    EmpleadoFamiliaresDialogComponent,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './empleado-familiares-table.component.html',
  styleUrl: './empleado-familiares-table.component.scss'
})

export class EmpleadoFamiliaresTableComponent implements OnInit {

  empleadoId!: number;
  empleadoFamiliares: EmpleadoFamiliar[] = [];
  displayDialog = false;
  familiarEdit?: EmpleadoFamiliar; // para edición
  cedulaBloqueo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoFamiliarService: EmpleadoFamiliarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFamiliares();
  }

  // método para confirmar eliminación
  confirmDelete(familiar: EmpleadoFamiliar) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a: ${familiar.nombre} ${familiar.apellido}?`,
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
        this.deleteFamiliar(familiar.id!);
      }
    });
  }

  // método que llama al servicio
  deleteFamiliar(id: number) {
    this.empleadoFamiliarService.delete(id).subscribe({
      next: (response) => {
        ResponseHandlerUtil.handleResponse(response, this.messageService)
        this.loadFamiliares();
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
      }
    });
  }

  loadFamiliares() {
    this.empleadoFamiliarService.getFamiliarByEmpleadoId(this.empleadoId).subscribe({
      next: (data) => {
        this.empleadoFamiliares = data;
      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService)
      }
    });
  }

  openCreateDialog() {
    this.familiarEdit = undefined; // modo creación
    this.displayDialog = true;
  }

  openEditDialog(familiar: EmpleadoFamiliar) {
    this.familiarEdit = familiar; // modo edición
    this.displayDialog = true;
    this.cedulaBloqueo = true;
  }

  onDialogHide() {
    this.displayDialog = false;
    this.familiarEdit = undefined;
  }

  onSaved(familiarData: any) {
    if (this.familiarEdit) {
      // Actualizar
      this.empleadoFamiliarService.update(this.familiarEdit.id!, familiarData).subscribe({
        next: (response) => {
          ResponseHandlerUtil.handleResponse(response, this.messageService)
          this.loadFamiliares();
          this.onDialogHide();
        },
        error: (err) => {
          ResponseHandlerUtil.handleError(err, this.messageService)
        }
      });
    } else {
      // Crear
      this.empleadoFamiliarService.postFamiliar(familiarData).subscribe({
        next: (response) => {
          ResponseHandlerUtil.handleResponse(response, this.messageService)
          this.loadFamiliares();
          this.onDialogHide();
        },
        error: (err) => {
          ResponseHandlerUtil.handleError(err, this.messageService)
        }
      });
    }
  }

  onCancelled() {
    this.onDialogHide();
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }

}
