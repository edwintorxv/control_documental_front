import { Departamento } from "./departamento.model";

export interface CiudadMunicipio {
    id: number,
    codigoDane: string,
    nombre: string,
    departamento: Departamento
}