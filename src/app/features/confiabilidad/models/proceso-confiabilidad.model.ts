import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model";
import { Cliente } from "../../clientes/models/cliente.model";
import { Concepto } from "../../clientes/models/concepto.model";
import { ProfesionalConfiabilidad } from "../../clientes/models/profesional-confiabilidad.model";

export interface ProcesoConfiabilidad {

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