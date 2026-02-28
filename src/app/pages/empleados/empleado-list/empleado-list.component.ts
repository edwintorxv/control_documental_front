import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { EmpleadoFormDialogComponent } from '../../../features/empleados/components/empleado-form-dialog/empleado-form-dialog.component';
import { EmpleadoTableComponent } from '../../../features/empleados/components/empleado-table/empleado-table.component';

import { Empleado } from '../../../features/empleados/models/empleado.model';
import { EmpleadoService } from '../../../features/empleados/services/empleado.service';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [
    CommonModule,
    EmpleadoTableComponent,
    EmpleadoFormDialogComponent,
    ButtonModule,
    Dialog,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.scss'
})
export class EmpleadoListComponent implements OnInit {

  searchControl = new FormControl('');

  empleados: Empleado[] = [];
  empleadosOriginal: Empleado[] = [];

  displayFormDialog: boolean = false;
  selectedEmpleado?: Empleado;
  isEditMode: boolean = false;

  constructor(private empleadoService: EmpleadoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.getAll().subscribe({
      next: (data) => {
        this.empleadosOriginal = data;
        this.empleados = data;
      },
      error: (err) => {
        console.error('Error cargando empleados:', err);
      }
    });
  }

  buscar(): void {

    const valor = this.searchControl.value?.trim();

    if (!valor) {
      this.empleados = this.empleadosOriginal;
      this.messageService.add({
        severity: 'warn',
        summary: 'No hay data para buscar',
        detail: 'Ingrese un número de cédula'
      });
      return;
    }

    this.empleadoService.findByIdentificacion(valor).subscribe({
      next: (data) => {
        this.empleados = data ?? [];

        this.messageService.add({
          severity: 'success',
          summary: 'Consulta exitosa',
          detail: 'Empleado encontrado'
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'No hay data para mostrar',
          detail: 'Revise el numero de cedula'
        });
        console.error('Error en búsqueda:', err);
      }
    });
  }

  limpiar(): void {
    this.searchControl.setValue('');
    this.empleados = this.empleadosOriginal;
  }

  openFormCreateDialog(): void {
    this.selectedEmpleado = undefined;
    this.isEditMode = false;
    this.displayFormDialog = true;
  }

  openFormEditDialog(empleado: Empleado): void {
    this.selectedEmpleado = empleado;
    this.isEditMode = true;
    this.displayFormDialog = true;
  }

  onEmpleadoSaved(): void {
    this.loadEmpleados();
    this.displayFormDialog = false;
  }

}