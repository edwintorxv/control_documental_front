import { Departamento } from "./departamento.model";

export interface DepartamentoResponseWraper {

    metadata: any[];
    departamentoResponse: {
        lstDepartamento: Departamento[];
        departamento: Departamento | null;
    };

}