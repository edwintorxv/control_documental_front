import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { ProcesoConfiabilidad } from '../models/proceso-confiabilidad.model';
import { ProcesoConfiabilidadResponse } from '../models/proceso-confiabilidad.response.model';
import { map, Observable } from 'rxjs';
import { ConceptoResponse } from '../models/concepto-response.model';

@Injectable({
    providedIn: 'root'
})

export class ConceptoService {

    private API_URL = `${environment.apiUrl}/concepto`

    constructor(private http: HttpClient) { }

    getConceptos(): Observable<ConceptoResponse>{
        return this.http.get<ConceptoResponse>(`${this.API_URL}`)
    }

}