import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ResponseHandlerUtil } from '../../../core/utils/response-handler.util';
import { ProcesoConfiabilidad } from '../../../features/confiabilidad/models/proceso-confiabilidad.model';
import { ProcesoConfiabilidadService } from '../../../features/confiabilidad/services/proceso-confiabilidad.service';
import { ProcesoConfiabilidadCreateDialogComponent } from '../../../features/confiabilidad/components/proceso-confiabilidad-create-dialog/proceso-confiabilidad-create-dialog.component';
import { ProcesoConfiabilidadListComponent } from '../../../features/confiabilidad/components/proceso-confiabilidad-table/proceso-confiabilidad-table.component';
import { ProcesoConfiabilidadUpdateDialogComponent } from '../../../features/confiabilidad/components/proceso-confiabilidad-update-dialog/proceso-confiabilidad-update-dialog.component';

@Component({
  selector: 'app-confiabilidad-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Dialog,
    ReactiveFormsModule,
    InputTextModule,
    ProcesoConfiabilidadListComponent,
    ProcesoConfiabilidadCreateDialogComponent,
    ProcesoConfiabilidadUpdateDialogComponent
  ],
  templateUrl: './confiabilidad-list.component.html',
  styleUrl: './confiabilidad-list.component.scss'
})

export class ConfiabilidadListComponent implements OnInit {

  lstProcesos: ProcesoConfiabilidad[] = [];
  lstProcesosOriginal: ProcesoConfiabilidad[] = [];

  searchControl = new FormControl('');

  displayFormDialog: boolean = false;
  displayUpdateDialog: boolean = false;

  selectedProceso?: ProcesoConfiabilidad;

  isEditMode: boolean = false;

  constructor(
    private procesoConfiabilidadService: ProcesoConfiabilidadService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadProcesos();
  }

  loadProcesos() {

    this.procesoConfiabilidadService.getProcesoPorEstado(['A', 'C']).subscribe({
      next: (data) => {
        this.lstProcesos = data;
        this.lstProcesosOriginal = data;
      },
      error: (error) => {
        ResponseHandlerUtil.handleError(error, this.messageService);
      }
    });

  }

  buscar(): void {

    const cedulaEvaluado = this.searchControl.value?.trim();

    if (!cedulaEvaluado) {
      this.lstProcesos = this.lstProcesosOriginal;
      this.messageService.add({
        severity: 'warn',
        summary: 'No hay data para buscar',
        detail: 'Ingrese un número de cédula',
        life: 4000
      });
      return;
    }

    this.procesoConfiabilidadService.getProcesosPorEvaluado(cedulaEvaluado).subscribe({
      next: (response) => {

        this.lstProcesos = response.procesoConfiabilidadResponse.lstProcesoConfiabilidad;

        ResponseHandlerUtil.handleResponse(response, this.messageService)

      },
      error: (err) => {
        ResponseHandlerUtil.handleError(err, this.messageService);
      }
    });

  }

  limpiar(): void {
    this.searchControl.setValue('');
    this.lstProcesos = this.lstProcesosOriginal;
  }

  openFormCreateDialog(): void {
    this.selectedProceso = undefined;
    this.isEditMode = false;
    this.displayFormDialog = true;
  }

  openFormEditDialog(procesoConfiabilidad: ProcesoConfiabilidad): void {
    this.selectedProceso = procesoConfiabilidad;
    this.isEditMode = true;
    this.displayFormDialog = true;
  }

  openUpdateDialog(proceso: ProcesoConfiabilidad) {
    this.selectedProceso = proceso;
    this.displayUpdateDialog = true;
  }

  onEmpleadoSaved(): void {
    this.loadProcesos();
    this.displayFormDialog = false;
  }

  onProcesoUpdated() {
    this.loadProcesos();
    this.displayUpdateDialog = false;
  }

}