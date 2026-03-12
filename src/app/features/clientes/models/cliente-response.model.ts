import { Cliente } from "./cliente.model";

export interface ClienteResponse {
    metaData: any[];
    clienteResponse: {
        lstCliente: Cliente[];
        cliente: Cliente | null;
    }
}