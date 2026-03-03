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
import { EmpleadoFamiliaresDialogComponent } from '../components/empleado-familiares-dialog/empleado-familiares-dialog.component';
import { EmpleadoFamiliar } from '../models/empleado-familiar.model';
import { EmpleadoFamiliarService } from '../services/empleado-familiar.service';



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
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro eliminado',
          detail: 'Se ha eliminado el registro del familiar',
          life: 4000
        });
        this.loadFamiliares();
      },
      error: (err) => this.handleError(err)
    });
  }

  loadFamiliares() {
    this.empleadoFamiliarService.getFamiliarByEmpleadoId(this.empleadoId).subscribe({
      next: (data) => {
        this.empleadoFamiliares = data;
      },
      error: (err) => {
        const metadata = err.error?.metadata?.[0];
        if (metadata) {
          this.messageService.add({
            severity: 'warn',
            summary: metadata.descripcion,
            detail: 'Aún no se han creado familiares para este empleado',
            life: 4000
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los familiares',
            life: 4000
          });
        }
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
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Familiar actualizado correctamente',
            life: 4000
          });
          this.loadFamiliares();
          this.onDialogHide();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      // Crear
      this.empleadoFamiliarService.postFamiliar(familiarData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Familiar creado correctamente',
            life: 4000
          });
          this.loadFamiliares();
          this.onDialogHide();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  onCancelled() {
    this.onDialogHide();
  }

  handleError(err: any) {
    const metadata = err.error?.metadata?.[0];
    this.messageService.add({
      severity: 'error',
      summary: metadata?.tipo || 'Error',
      detail: metadata?.descripcion || 'Ocurrió un error'
    });
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }

}
