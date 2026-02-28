import { EmpleadoFamiliar } from "./empleado-familiar.model";

export interface EmpleadoFamiliarResponseWraper {
    metadate: any[];
    empleadoFamiliarResponse: {
        lstEmpleadoFamiliar: EmpleadoFamiliar[];
        empleadorFamiliar: EmpleadoFamiliar | null;
    }

}