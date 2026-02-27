import { EstadoCivil } from "./estado-civil.model";

export interface EstadoCivilResponseWraper {
    metadata: any[];
    estadoCivilResponse: {
        lstEsadoCivil: EstadoCivil[];
        estadoCivil: EstadoCivil | null;
    }
}