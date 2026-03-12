import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClienteTableComponent } from '../../../features/clientes/components/cliente-table/cliente-table.component';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ClienteService } from '../../../features/clientes/services/cliente.service';
import { Cliente } from '../../../features/clientes/models/cliente.model';
import { ClienteFormDialogComponent } from '../../../features/clientes/components/cliente-dialog/cliente-form-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-list',
  imports: [
    CommonModule,
    ClienteTableComponent,
    ClienteFormDialogComponent,
    ButtonModule,
    ButtonModule,
    Dialog,
    ReactiveFormsModule,
    InputTextModule
  ],
  //standalone: true,
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})

export class ClienteListComponent implements OnInit {

  searchControl = new FormControl('');

  clientes: Cliente[] = [];
  clienteOriginal: Cliente[] = [];

  displayFormDialog: boolean = false;
  selectedCliente?: Cliente;
  isEditMode: boolean = false;

  lstClientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    console.log('Carga clientes')
    this.cargarClientes();

  }

  cargarClientes() {
    console.log('Entra al metodo')
    this.clienteService.getClientes()
      .subscribe({
        next: (response) => {
          this.lstClientes = response;
        },
        error: (err) => {
          let mensaje = '';

          if (err.status === 0) {
            mensaje = 'No se puede conectar con el servidor';
          } else {
            mensaje = err.message;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: mensaje,
            life: 4000
          });
        }
      })
  }

  limpiar(): void {
    this.searchControl.setValue('');
    this.cargarClientes();
  }

  openFormCreateDialog(): void {
    this.selectedCliente = undefined;
    this.isEditMode = false;
    this.displayFormDialog = true;
  }

  openFormEditDialog(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.isEditMode = true;
    this.displayFormDialog = true;
  }

  clienteSaved(): void {
    this.cargarClientes();
    this.displayFormDialog = false;
  }

  buscarCliente(): void {

    const nitCliente = this.searchControl.value?.trim();

    if (!nitCliente) {
      this.messageService.add({
        severity: 'info',
        summary: 'No hay datos para buscar',
        detail: 'Ingrese un numero de NIT sin guiones ni espacios',
        life: 4000
      })
      return;
    }

    this.clienteService.getClientePorNit(nitCliente)
      .subscribe({
        next: (data) => {
          this.lstClientes = data ?? [];
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: err.error,
            detail: 'Ingrese un numero de NIT sin guiones ni espacios',
            life: 4000
          });
        }
      });
  }



}
