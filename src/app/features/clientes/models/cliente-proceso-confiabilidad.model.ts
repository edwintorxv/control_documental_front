import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model";
import { Cliente } from "./cliente.model";
import { Concepto } from "./concepto.model";
import { ProfesionalConfiabilidad } from "./profesional-confiabilidad.model";

export interface ClienteProcesoConfiabilidad {

    id: number;
    nombre: string;
    apellido: string;
    identificacion: string;
    telefono: string;
    fechaSolicitud: string;
    fechaAtencion: string;
    ampliacion: string;
    estadoProceso: string;
    fechaCreacion: string;
    urlArchivo: string;
    nombreArchivo: string;
    direccion: string;
    ciudadMunicipio: string;

    cliente: Cliente;
    concepto: Concepto;
    documentoMaestro: DocumentoMaestro;
    profesionalConfiabilidad: ProfesionalConfiabilidad;

}