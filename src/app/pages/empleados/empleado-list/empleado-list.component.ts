import { Component } from '@angular/core';
import { EmpleadoTableComponent } from '../../../features/empleados/components/empleado-table/empleado-table.component';

@Component({
  selector: 'app-empleado-list',
  imports: [EmpleadoTableComponent],
  standalone: true,
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.scss'
})
export class EmpleadoListComponent {

}
