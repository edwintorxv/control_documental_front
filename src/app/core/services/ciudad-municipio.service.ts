import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CiudadMunicipioResponseWraper } from '../../shared/models/ciudad-municipio-response-wraper';
import { CiudadMunicipio } from '../../shared/models/ciudad-municipio.model';

@Injectable({
    providedIn: 'root'
})

export class CiudadMunicipioService {

    private API_URL = `${environment.apiUrl}/ciudadMunicipio`

    constructor(private http: HttpClient) { }

    getCiudadMunicipioByDepartamentoId(idDepartamento: number): Observable<CiudadMunicipio[]> {

        return this.http
            .get<CiudadMunicipioResponseWraper>(`${this.API_URL}/${idDepartamento}`)
            .pipe(
                map(response => response.ciudadMunicipioResponse.lstCiudadMunicipio)
            );
    }

}