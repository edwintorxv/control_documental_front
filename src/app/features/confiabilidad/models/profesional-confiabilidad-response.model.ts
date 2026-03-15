import { ProfesionalConfiabilidad } from "./profesional-confiabilidad.model";

export interface ProfesionalConfiabilidadResponse {

    metaData: any[];
    profesionalConfiabilidadResponse: {
        lstProfesionaConfiabilidad: ProfesionalConfiabilidad[];
    }

}