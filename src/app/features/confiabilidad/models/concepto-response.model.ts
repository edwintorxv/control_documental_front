import { Concepto } from "./concepto.model";

export interface ConceptoResponse {

    metaData: any[];
    conceptoResponse: {
        lstConcepto: Concepto[];
    }

}