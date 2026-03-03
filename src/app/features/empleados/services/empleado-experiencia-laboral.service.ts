import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmpleadoExperienciaLaboral } from '../models/empleado-experiencia-laboral.model';
import { EmpleadoExperienciLaboralResponse } from '../models/empleado-experiencia-laboral.response.model';

@Injectable({
    providedIn: 'root'
})

export class EmpleadoExperienciaLaboralService {

    private API_URL = `${environment.apiUrl}/empleadoLaboral`

    constructor(private http: HttpClient) { }

    getExperienciaLaboral(idEmpleado: number): Observable<EmpleadoExperienciLaboralResponse> {
        return this.http
            .get<EmpleadoExperienciLaboralResponse>(`${this.API_URL}/${idEmpleado}`);
    }

    postExperienciaLaboral(experiencaLaboral: EmpleadoExperienciaLaboral) {
        return this.http
            .post(`${this.API_URL}`, experiencaLaboral)

    }

    putExperienciaLaboral(id: number, experienciaLaboral: any): Observable<EmpleadoExperienciaLaboral> {
        return this.http
            .put<EmpleadoExperienciaLaboral>(`${this.API_URL}/${id}`, experienciaLaboral)
    }

    deleteExperienciaLaboral(id: number){
        return this.http
        .delete<void>(`${this.API_URL}/${id}`);
    }

}