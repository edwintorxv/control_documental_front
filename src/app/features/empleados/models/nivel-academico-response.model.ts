import { NivelAcademico } from "./nivel-academico.model";

export interface NivelAcademicoResponse{
    metadata: any[];
    nivelAcademicoResponse:{
        lstNivelAcademico: NivelAcademico[];
        nivelAcademico: NivelAcademico | null;
    }
}