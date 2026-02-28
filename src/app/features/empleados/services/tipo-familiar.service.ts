import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TipoFamiliarResponseWraper } from '../models/tipo-familiar-response-wraper.model';
import { TipoFamiliar } from '../models/tipo-familiar.model';

@Injectable({
    providedIn: 'root'
})

export class TipoFamiliarService {

    private API_URL = `${environment.apiUrl}`

    constructor(private http: HttpClient) { }

    getTipoFamiliar(): Observable<TipoFamiliar[]> {
        return this.http
            .get<TipoFamiliarResponseWraper>(`${this.API_URL}/tipoFamiliar`)
            .pipe(
                map(response => response.tipoFamiliarResponse.lstTipoFamiliar)
            )
    }

}