import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-table',
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
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.scss'
})
export class ClienteTableComponent {

  constructor(private router: Router) { }

  @Input() lstClientes: Cliente[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Cliente>();
  @Input() searchControl!: FormControl


  visible: boolean = false;
  selectedCliente?: Cliente;
  displayEditDialog: boolean = false;

  onCreateClick() {
    this.create.emit();
  }

  showDialog(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.visible = true;
  }

  editarCliente() {
    this.visible = false;
    if (this.selectedCliente) {
      this.edit.emit(this.selectedCliente);
    }
  }

  abrirConfiabilidad() {
    this.visible = false;
    if (this.selectedCliente?.id) {
      this.router.navigate(['/clientes', this.selectedCliente?.id, 'confiabilidad'])
    }
  }

}
