import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmpleadoDocumentoResponse } from '../models/empleado-documento-response.model';
import { EmpleadoDocumento } from '../models/empleado-documento.model';

@Injectable({
    providedIn: 'root'
})

export class EmpleadoDocumentoService {

    private API_URL = `${environment.apiUrl}/documentoEmpleado`

    constructor(private http: HttpClient) { }

    getEmpleadoDocumento(idEmpleado: number): Observable<EmpleadoDocumentoResponse> {
        return this.http
            .get<EmpleadoDocumentoResponse>(`${this.API_URL}/empleado/${idEmpleado}`);
    }

    postEmpleadoDocumento(empleaDocumento: EmpleadoDocumento): Observable<EmpleadoDocumentoResponse> {
        return this.http
            .post<EmpleadoDocumentoResponse>(`${this.API_URL}`, empleaDocumento);
    }

    deleteEmpleadoDocumento(idDocumento: number) {
        return this.http
            .delete(`${this.API_URL}/${idDocumento}`)
    }

}