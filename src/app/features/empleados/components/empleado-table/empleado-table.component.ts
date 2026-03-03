import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Empleado } from '../../models/empleado.model';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-empleado-table',
  imports: [
    TableModule,
    InputTextModule,
    Button,
    ToolbarModule,
    MenuModule,
    Dialog,
    ReactiveFormsModule,
    CardModule
  ],
  standalone: true,
  templateUrl: './empleado-table.component.html',
  styleUrl: './empleado-table.component.scss'
})

export class EmpleadoTableComponent {

  constructor(private router: Router) { }

  @Input() empleados: Empleado[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Empleado>();
  @Input() searchControl!: FormControl

  onCreateClick() {
    this.create.emit();
  }

  visible: boolean = false;
  selectedEmpleado?: Empleado;
  displayEditDialog: boolean = false;

  showDialog(emp: Empleado) {
    this.selectedEmpleado = emp;
    this.visible = true;
  }

  editarEmpleado() {
    this.visible = false;
    if (this.selectedEmpleado) {
      this.edit.emit(this.selectedEmpleado);
    }
  }

  abrirFamiliares() {
    // Cierra el diálogo de acciones
    this.visible = false;

    // Navega a la ruta de familiares pasando el id del empleado
    if (this.selectedEmpleado?.id) {
      this.router.navigate(['/empleados', this.selectedEmpleado.id, 'familiares']);
    }
  }

  agregarExperienciaLaboral() {
    // Cierra el diálogo de acciones
    this.visible = false;

    // Navega a la ruta de experiencia laboral pasando el id del empleado
    if (this.selectedEmpleado?.id) {
      this.router.navigate(['/empleados', this.selectedEmpleado.id, 'laboral']);
    }
  }

}
