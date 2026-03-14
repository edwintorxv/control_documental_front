import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cliente } from "../models/cliente.model";
import { ClienteResponse } from "../models/cliente-response.model";

@Injectable({
    providedIn: 'root'
})

export class ClienteService {

    private API_URL = `${environment.apiUrl}`
    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http
            .get<ClienteResponse>(`${this.API_URL}/cliente`)
            .pipe(
                map(response => response.clienteResponse.lstCliente)
            );
    }

    postCliente(cliente: Cliente) {
        return this.http
            .post(`${this.API_URL}/cliente`, cliente);
    }

    putCliente(idCliente: number, cliente: Cliente) {
        return this.http
            .put(`${this.API_URL}/cliente/${idCliente}`, cliente)
    }

    getClientePorNit(nitCliente: string): Observable<ClienteResponse> {

        return this.http
            .get<ClienteResponse>(`${this.API_URL}/cliente/${nitCliente}`)
    }

}