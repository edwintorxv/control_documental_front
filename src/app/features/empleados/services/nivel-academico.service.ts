import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NivelAcademico } from '../models/nivel-academico.model';
import { NivelAcademicoResponse } from '../models/nivel-academico-response.model';

@Injectable({
    providedIn: 'root'
})

export class NivelAcademicoService {

    private API_URL = `${environment.apiUrl}/nivelAcademico`

    constructor(private http: HttpClient) { }

    getAll(): Observable<NivelAcademico[]> {

        return this.http
            .get<NivelAcademicoResponse>(this.API_URL)
            .pipe(
                map(response => response.nivelAcademicoResponse.lstNivelAcademico)
            )
    }

}