import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EstadoCivilResponseWraper } from '../models/estado-civil-response-wraper';
import { EstadoCivil } from '../models/estado-civil.model';

@Injectable({
    providedIn: 'root'
})

export class EstadoCivilService {

    private API_URL = `${environment.apiUrl}/estadoCivil`

    constructor(private http: HttpClient) { }

    getAll(): Observable<EstadoCivil[]> {
        return this.http
            .get<EstadoCivilResponseWraper>(this.API_URL)
            .pipe(
                map(response => response.estadoCivilResponse.lstEsadoCivil)
            )

    }

}