import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Estado } from '../../../shared/models/estado.model';
import { CargoResponseWraper } from '../models/cargo-respose-wraper.model';
import { EstadoResponseWraper } from '../../../shared/models/estado-response-wraper.model';

@Injectable({
    providedIn: 'root'
})

export class EstadoService {
    private API_URL = `${environment.apiUrl}/estado`

    constructor(private http: HttpClient) { }

    getAll(): Observable<Estado[]> {

        return this.http
            .get<EstadoResponseWraper>(this.API_URL)
            .pipe(
                map(response => response.estadoResponse.lstEstado)
            )
    }
}