import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model";
import { Empleado } from "./empleado.model";

export interface EmpleadoDocumento {
    
    id: number;
    empleado: Empleado;
    documentoMaestro: DocumentoMaestro;
    fechaInicial: string;
    fechaVencimiento: string;
    urlArchivo: string;
    nombreArchivo: string;

}