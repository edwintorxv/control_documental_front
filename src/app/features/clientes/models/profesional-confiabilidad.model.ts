import { Empleado } from "../../empleados/models/empleado.model";

export interface ProfesionalConfiabilidad {

    id: number;
    fk_empleado: Empleado;

}