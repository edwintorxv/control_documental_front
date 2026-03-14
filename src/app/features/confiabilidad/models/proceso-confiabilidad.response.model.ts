import { ProcesoConfiabilidad } from "./proceso-confiabilidad.model";

export interface ProcesoConfiabilidadResponse {

    metaData: any[];
    procesoConfiabilidadResponse: {
        lstProcesoConfiabilidad: ProcesoConfiabilidad[];
        procesoConfiabilidad: ProcesoConfiabilidad | null;

    }

}