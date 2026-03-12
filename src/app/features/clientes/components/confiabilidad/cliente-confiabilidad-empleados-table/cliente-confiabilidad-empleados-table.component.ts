import { Component, OnInit } from '@angular/core';
import { ClienteProcesoConfiabilidad } from '../../../models/cliente-proceso-confiabilidad.model';
import { clienteProcesoConfiabilidadService } from '../../../services/cliente-proceso-confiabilidad.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ClienteConfiabilidadEmpleadosDialogComponent } from '../cliente-confiabilidad-empleados-dialog/cliente-confiabilidad-empleados-dialog.component';
import { ResponseHandlerUtil } from '../../../../../core/utils/response-handler.util';

@Component({
  selector: 'app-cliente-confiabilidad-empleados-table',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ClienteConfiabilidadEmpleadosDialogComponent
  ],
  templateUrl: './cliente-confiabilidad-empleados-table.component.html',
  styleUrl: './cliente-confiabilidad-empleados-table.component.scss'
})


export class ClienteConfiabilidadEmpleadosTableComponent implements OnInit {

  clienteId!: number;
  lstProcesoPorCliente: ClienteProcesoConfiabilidad[] = [];
  displayDialog = false;
  procesoConfiabilidadEdit?: ClienteProcesoConfiabilidad; // para edición
  //cedulaBloqueo: boolean = false;


  constructor(
    private clienteProcesoConfiabilidadService: clienteProcesoConfiabilidadService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'))
    this.loadProcesosPorCliente();
  }

  loadProcesosPorCliente() {
    this.clienteProcesoConfiabilidadService.getProcesosPorCliente(this.clienteId).subscribe({
      next: (response) => {
        this.lstProcesoPorCliente = response
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
          summary: 'Errores',
          detail: mensaje,
          life: 4000
        });

      }
    })
  }

  onSaved(clienteConfiabilidad: any) {
    this.clienteProcesoConfiabilidadService.postProcesoCliente(clienteConfiabilidad)
      .subscribe({
        next: (response) => {

          ResponseHandlerUtil.handleResponse(response, this.messageService);
          this.loadProcesosPorCliente();
          this.onDialogHide();

        },
        error: (error) => ResponseHandlerUtil.handleError(error, this.messageService)
      });
  }

  openCreateDialog() {
    this.procesoConfiabilidadEdit = undefined; // modo creación
    this.displayDialog = true;
  }

  openEditDialog(clienteProcesoConfiabilidad: ClienteProcesoConfiabilidad) {
    this.procesoConfiabilidadEdit = clienteProcesoConfiabilidad; // modo edición
    this.displayDialog = true;
    //this.cedulaBloqueo = true;
  }

  onDialogHide() {
    this.displayDialog = false;
    this.procesoConfiabilidadEdit = undefined;
  }

   onCancelled() {
    this.onDialogHide();
  }

  volver(): void {
    this.router.navigate(['/clientes']);
  }


}
