import { CiudadMunicipio } from "../../../shared/models/ciudad-municipio.model"
import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model"
import { Estado } from "../../../shared/models/estado.model"
import { Cargo } from "./cargo.model"
import { EstadoCivil } from "./estado-civil.model"
import { NivelAcademico } from "./nivel-academico.model"

export interface Empleado {

    id: number,
    nombre: string,
    apellido: string,
    fechaNacimiento: String,
    numeroIdentificacion: string,
    direccionResidencia: string,
    numeroTelefono: string,
    fechaIngreso: string,
    fechaRetiro?: string | null,
    documentoMaestro: DocumentoMaestro,
    ciudadMunicipio: CiudadMunicipio,
    nivelAcademico: NivelAcademico,
    estadoCivil: EstadoCivil,
    cargo: Cargo,
    estado: Estado

}