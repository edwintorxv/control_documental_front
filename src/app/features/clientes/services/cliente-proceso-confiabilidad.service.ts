import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { ClienteProcesoConfiabilidad } from '../models/cliente-proceso-confiabilidad.model';
import { ClienteProcesoConfiabilidadResponse } from '../models/cliente-proceso-confiabilidad.response.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class clienteProcesoConfiabilidadService {

    private API_URL = `${environment.apiUrl}/procesoConfiabilidad`

    constructor(private http: HttpClient) { }


    getProcesosPorCliente(idCliente: number): Observable<ClienteProcesoConfiabilidad[]> {
        return this.http
            .get<ClienteProcesoConfiabilidadResponse>(`${this.API_URL}/buscarPorCliente/${idCliente}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.lstProcesoConfiabilidad)
            )
    }

    postProcesoCliente(clienteProceso: ClienteProcesoConfiabilidad) {
        return this.http
            .post(`${this.API_URL}/crearProceso`, clienteProceso);
    }

    getProcesoPorEstado(estadoProceso: string): Observable<ClienteProcesoConfiabilidad[]> {
        return this.http
            .get<ClienteProcesoConfiabilidadResponse>(`${this.API_URL}/${estadoProceso}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.lstProcesoConfiabilidad)
            )
    }

    getProcesoPorId(idProceso: number): Observable<ClienteProcesoConfiabilidad | null> {
        return this.http
            .get<ClienteProcesoConfiabilidadResponse>(`${this.API_URL}/buscarProceso/${idProceso}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.procesoConfiabilidad)
            );
    }

    updateProcesoConfiabildiad(idProceso: number, procesoConfiabilidad: ClienteProcesoConfiabilidad): Observable<ClienteProcesoConfiabilidad> {
        return this.http
            .put<ClienteProcesoConfiabilidad>(`${this.API_URL}/${idProceso}`, procesoConfiabilidad);
    }

}