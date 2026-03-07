import { CiudadMunicipio } from "../../../shared/models/ciudad-municipio.model";
import { Estado } from "../../../shared/models/estado.model";

export interface Cliente {

    id: number;
    nombre: string;
    nit: string;
    direccion: string;
    representante: string;
    telefono: string;
    estado: Estado;
    ciudadMunicipio: CiudadMunicipio;

}