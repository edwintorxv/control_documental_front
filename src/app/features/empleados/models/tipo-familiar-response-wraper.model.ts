import { TipoFamiliar } from "./tipo-familiar.model";

export interface TipoFamiliarResponseWraper {

    metadata: any[];
    tipoFamiliarResponse: {
        lstTipoFamiliar: TipoFamiliar[];
        tipoFamiliar: TipoFamiliar | null
    }

}