import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DocumentoMaestro } from '../../shared/models/documento-maestro.model';
import { environment } from '../../../environments/environment';
import { DocumentoMaestroResponseWraper } from '../../shared/models/documento-maestro-response-wraper';

@Injectable({
    providedIn: 'root'
})

export class DocumentoMaestroService {

    private API_URL = `${environment.apiUrl}/documentos`

    constructor(private http: HttpClient) { }

    getDocumentoMaestroById(id: number): Observable<DocumentoMaestro[]> {

        return this.http
            .get<DocumentoMaestroResponseWraper>(`${this.API_URL}/${id}`)
            .pipe(
                map(response => response.documentoMaestroResponse.lstDocumentoMaestro)
            );
    }

}