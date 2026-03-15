import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProfesionalConfiabilidadResponse } from '../models/profesional-confiabilidad-response.model';

@Injectable({
    providedIn: 'root'
})

export class ProfesionalConfiabilidadService {

    private API_URL = `${environment.apiUrl}/profesionalConfiabilidad`

    constructor(private http: HttpClient) { }

    getProfesionalesConfiabilidad(): Observable<ProfesionalConfiabilidadResponse> {
        return this.http.get<ProfesionalConfiabilidadResponse>(`${this.API_URL}`)
    }

}