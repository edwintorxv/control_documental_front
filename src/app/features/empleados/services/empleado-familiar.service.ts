import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmpleadoFamiliarResponseWraper } from '../models/empleado-familiar-response-wraper.model';
import { EmpleadoFamiliar } from '../models/empleado-familiar.model';

@Injectable({
    providedIn: 'root'
})

export class EmpleadoFamiliarService {

    private API_URL = `${environment.apiUrl}`

    constructor(private http: HttpClient) { }

    getFamiliarByEmpleadoId(idEmpleado: number): Observable<EmpleadoFamiliar[]> {

        return this.http
            .get<EmpleadoFamiliarResponseWraper>(`${this.API_URL}/empleadoFamiliar/${idEmpleado}`)
            .pipe(
                map(response => response.empleadoFamiliarResponse.lstEmpleadoFamiliar)
            )
    }

    postFamiliar(empleado: EmpleadoFamiliar) {

        return this.http
            .post(`${this.API_URL}/empleadoFamiliar`, empleado);
    }

    update(id: number, familiar: any): Observable<EmpleadoFamiliar> {
        return this.http.put<EmpleadoFamiliar>(`${this.API_URL}/empleadoFamiliar/${id}`, familiar);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/empleadoFamiliar/${id}`);
    }

}