import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model";
import { Empleado } from "./empleado.model";
import { TipoFamiliar } from "./tipo-familiar.model";

export interface EmpleadoFamiliar {

    id: number;
    nombre: string;
    apellido: string;
    numeroIdentificacion: string;
    numeroTelefono: string;
    tipoFamiliar: TipoFamiliar;
    documentoMaestro: DocumentoMaestro;
    empleado: Empleado;
    viveConEmpleado: string;

}