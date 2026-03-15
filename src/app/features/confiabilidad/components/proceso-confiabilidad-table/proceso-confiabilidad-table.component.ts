import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ProcesoConfiabilidad } from '../../models/proceso-confiabilidad.model';

@Component({
  selector: 'app-proceso-confiabilidad-table',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    Button,
    ToolbarModule,
    MenuModule,
    ReactiveFormsModule,
    CardModule
  ],
  templateUrl: './proceso-confiabilidad-table.component.html',
  styleUrl: './proceso-confiabilidad-table.component.scss'
})
export class ProcesoConfiabilidadListComponent {

  @Input() lstProcesos: ProcesoConfiabilidad[] = [];
  @Input() searchControl!: FormControl
  
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<ProcesoConfiabilidad>();
  @Output() update = new EventEmitter<ProcesoConfiabilidad>();

}
