import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MetaDataResponse } from '../../features/empleados/models/metadata-response.model';

@Injectable({
    providedIn: 'root'
})

export class AlmacenamientoService {

    private API_URL = `${environment.apiUrl}`

    constructor(private http: HttpClient) { }

    crearCarpeta(carpeta: string) {
        return this.http.get<any>(`${this.API_URL}/crearCarpeta`, {
            params: { carpeta }
        });
    }

    cargarArchivo(ruta: string, archivo: File): Observable<MetaDataResponse> {

        const formData = new FormData();
        formData.append('ruta', ruta);
        formData.append('archivo', archivo);

        return this.http.post<MetaDataResponse>(
            `${this.API_URL}/cargarArchivo`,
            formData
        );
    }

    verArchivo(rutaArchivo: string, nombreArchivo: string): string {
        return `${this.API_URL}/verArchivo?ruta=${encodeURIComponent(rutaArchivo)}&nombreArchivo=${encodeURIComponent(nombreArchivo)}`;
    }

}