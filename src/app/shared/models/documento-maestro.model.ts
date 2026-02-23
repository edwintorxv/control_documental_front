import { TipoDocumento } from "./tipo-documento.model";

export interface DocumentoMaestro {
    id: number,
    nombre: string,
    sigla: string
    tipoDocumento: TipoDocumento,
}