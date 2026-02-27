import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DepartamentoResponseWraper } from '../../shared/models/departamento-response-wraper.model';
import { Departamento } from '../../shared/models/departamento.model';

@Injectable({
    providedIn: 'root'
})

export class DepartamentoService {

    private API_URL = `${environment.apiUrl}/departamentos`

    constructor(private http: HttpClient) { }

    getAll(): Observable<Departamento[]> {
        return this.http
            .get<DepartamentoResponseWraper>(`${this.API_URL}`)
            .pipe(
                map(response => response.departamentoResponse.lstDepartamento)
            );
    }

}
