import { DocumentoMaestro } from "./documento-maestro.model";

export interface DocumentoMaestroResponseWraper {
    metadata: any[];
    documentoMaestroResponse: {
        lstDocumentoMaestro: DocumentoMaestro[];
        documentoMaestro: DocumentoMaestro | null;
    };
}