import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmpleadoResponseWraper } from '../models/empleado-response.model';
import { Empleado } from '../models/empleado.model';

@Injectable({
    providedIn: 'root'
})

export class EmpleadoService {

    private API_URL = `${environment.apiUrl}`

    constructor(private http: HttpClient) { }

    getAll(): Observable<Empleado[]> {
        return this.http
            .get<EmpleadoResponseWraper>(`${this.API_URL}/listadoEmpleado`)
            .pipe(
                map(response => response.empleadoResponse.lstEmpleado)
            );
    }

    postEmpleado(empleado: any) {

        return this.http
            .post(`${this.API_URL}/crearEmpleado`, empleado);

    }

    putEmpleado(idEmpleado: number, empleado: any) {

        return this.http
            .put(`${this.API_URL}/editarEmpleado/${idEmpleado}`, empleado);

    }

    findByIdentificacion(identificacion: string): Observable<EmpleadoResponseWraper> {
        return this.http.get<EmpleadoResponseWraper>(`${this.API_URL}/empleado/${identificacion}`);
    }

    findByEmpleadoId(idEmpleado: number): Observable<Empleado[]> {

        return this.http
            .get<EmpleadoResponseWraper>(`${this.API_URL}/empleado/busquedaPorId/${idEmpleado}`)
            .pipe(
                map(response => {
                    const emp = response.empleadoResponse.empleado;
                    return emp ? [emp] : [];
                })
            )

    }

}