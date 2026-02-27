import { Empleado } from "./empleado.model";

export interface EmpleadoResponseWraper {

    metadata: any[];
    empleadoResponse: {
        lstEmpleado: Empleado[];
        empleado: Empleado | null;
    };
    
}