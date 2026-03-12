import { ClienteProcesoConfiabilidad } from "./cliente-proceso-confiabilidad.model";

export interface ClienteProcesoConfiabilidadResponse {

    metaData: any[];
    procesoConfiabilidadResponse: {
        lstProcesoConfiabilidad: ClienteProcesoConfiabilidad[];
        procesoConfiabilidad: ClienteProcesoConfiabilidad | null;

    }

}