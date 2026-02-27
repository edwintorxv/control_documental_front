import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Empleado } from '../../models/empleado.model';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-empleado-table',
  imports: [
    TableModule,
    InputTextModule,
    Button,
    ToolbarModule,
    MenuModule,
    Dialog,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './empleado-table.component.html',
  styleUrl: './empleado-table.component.scss'
})

export class EmpleadoTableComponent {

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

}
