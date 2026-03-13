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
import { ProcesoConfiabilidadCreateDialogComponent } from '../proceso-confiabilidad-create-dialog/proceso-confiabilidad-create-dialog.component';
import { ResponseHandlerUtil } from '../../../../../core/utils/response-handler.util';
import { AlmacenamientoService } from '../../../../../core/services/almacenamiento.service';

@Component({
  selector: 'app-proceso-confiabilidad-list',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ProcesoConfiabilidadCreateDialogComponent
  ],
  templateUrl: './proceso-confiabilidad-list.component.html',
  styleUrl: './proceso-confiabilidad-list.component.scss'
})


export class ProcesoConfiabilidadListComponent implements OnInit {

  clienteId!: number;
  lstProcesoPorCliente: ClienteProcesoConfiabilidad[] = [];
  displayDialog = false;
  procesoConfiabilidadEdit?: ClienteProcesoConfiabilidad; // para edición
  rutaPdf: string = '';
  tipoDocumento: any = '';
  visiblePdf = false;
  //cedulaBloqueo: boolean = false;


  constructor(
    private clienteProcesoConfiabilidadService: clienteProcesoConfiabilidadService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
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
        ResponseHandlerUtil.handleError(err, this.messageService)

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
        error: (error) => {
          ResponseHandlerUtil.handleError(error, this.messageService)
        }
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

  volver(): void {
    this.router.navigate(['/clientes']);
  }

  verDocumento(data: any) {

    this.clienteProcesoConfiabilidadService.getProcesoPorId(data.id).subscribe({
      next: (procesoData) => {

        const pathPdf = procesoData?.urlArchivo;

        if (!pathPdf) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Sin documento',
            detail: 'Este proceso aún no tiene informe'
          });
          return;
        }

        const partes = pathPdf.split('/');

        const nombreArchivo = partes.pop() ?? '';
        const ruta = partes.join('/');

        const documentoTipo = procesoData?.documentoMaestro?.nombre;

        this.rutaPdf = this.almacenamientoService.verArchivo(ruta, nombreArchivo);

        this.tipoDocumento = documentoTipo;
        this.visiblePdf = true;

      }
    });

  }


}
