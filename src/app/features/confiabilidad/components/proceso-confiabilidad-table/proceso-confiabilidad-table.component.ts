import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcesoConfiabilidad } from '../../models/proceso-confiabilidad.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { Dialog } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

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
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<ProcesoConfiabilidad>();
  @Input() searchControl!: FormControl

}
