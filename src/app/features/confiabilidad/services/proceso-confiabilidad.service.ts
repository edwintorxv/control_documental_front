import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { ProcesoConfiabilidad } from '../models/proceso-confiabilidad.model';
import { ProcesoConfiabilidadResponse } from '../models/proceso-confiabilidad.response.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProcesoConfiabilidadService {

    private API_URL = `${environment.apiUrl}/procesoConfiabilidad`

    constructor(private http: HttpClient) { }


    getProcesosPorCliente(idCliente: number): Observable<ProcesoConfiabilidad[]> {
        return this.http
            .get<ProcesoConfiabilidadResponse>(`${this.API_URL}/buscarPorCliente/${idCliente}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.lstProcesoConfiabilidad)
            )
    }

    postProcesoCliente(clienteProceso: ProcesoConfiabilidad) {
        return this.http
            .post(`${this.API_URL}/crearProceso`, clienteProceso);
    }

    getProcesoPorEstado(estadoProceso: string[]): Observable<ProcesoConfiabilidad[]> {
        return this.http
            .get<ProcesoConfiabilidadResponse>(`${this.API_URL}/buscarPorEstado/${estadoProceso}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.lstProcesoConfiabilidad)
            )
    }

    getProcesoPorId(idProceso: number): Observable<ProcesoConfiabilidad | null> {
        return this.http
            .get<ProcesoConfiabilidadResponse>(`${this.API_URL}/buscarProceso/${idProceso}`)
            .pipe(
                map(response => response.procesoConfiabilidadResponse.procesoConfiabilidad)
            );
    }

    updateProcesoConfiabildiad(idProceso: number, procesoConfiabilidad: ProcesoConfiabilidad): Observable<ProcesoConfiabilidad> {
        return this.http
            .put<ProcesoConfiabilidad>(`${this.API_URL}/${idProceso}`, procesoConfiabilidad);
    }

    getProcesosPorEvaluado(cedulaEvaluado: string): Observable<ProcesoConfiabilidadResponse> {
        return this.http
            .get<ProcesoConfiabilidadResponse>(`${this.API_URL}/buscarProcesoPorCedula/${cedulaEvaluado}`)
    }

}