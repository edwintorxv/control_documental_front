import { Estado } from "./estado.model";

export interface EstadoResponseWraper {
    metadata: any[];
    estadoResponse: {
        lstEstado: Estado[];
        estado: Estado | null;
    };

}