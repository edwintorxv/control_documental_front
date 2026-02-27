import { CiudadMunicipio } from "../../../shared/models/ciudad-municipio.model"
import { DocumentoMaestro } from "../../../shared/models/documento-maestro.model"
import { Estado } from "../../../shared/models/estado.model"
import { Cargo } from "./cargo.model"
import { EstadoCivil } from "./estado-civil.model"
import { NivelAcademico } from "./nivel-academico.model"

export interface Empleado {

    id: number,
    nombre: string, //Ok
    apellido: string, //OK
    fechaNacimiento: String, //Ok
    documentoMaestro: DocumentoMaestro, //Ok
    numeroIdentificacion: string, //Ok
    fechaIngreso: string, //Ok
    fechaRetiro?: string | null,
    ciudadMunicipio: CiudadMunicipio, //Ok
    direccionResidencia: string, //Ok
    numeroTelefono: string,
    nivelAcademico: NivelAcademico, //Ok
    estadoCivil: EstadoCivil,//Ok
    cargo: Cargo, //Ok
    estado: Estado

}