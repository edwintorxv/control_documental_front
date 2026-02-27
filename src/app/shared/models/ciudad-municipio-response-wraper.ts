import { CiudadMunicipio } from "./ciudad-municipio.model";

export interface CiudadMunicipioResponseWraper{

    metadata: any[];
        ciudadMunicipioResponse: {
            lstCiudadMunicipio: CiudadMunicipio[];
            ciudadMunicipio: CiudadMunicipio | null;
        };

}