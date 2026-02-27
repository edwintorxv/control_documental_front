import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CargoResponseWraper } from '../models/cargo-respose-wraper.model';
import { Cargo } from '../models/cargo.model';

@Injectable({
    providedIn: 'root'
})

export class CargoService {

    private API_URL = `${environment.apiUrl}/cargo`

    constructor(private http: HttpClient) { }

    getAll(): Observable<Cargo[]> {

        return this.http
            .get<CargoResponseWraper>(this.API_URL)
            .pipe(
                map(response => response.cargoResponse.lstCargo)
            );

    }

}