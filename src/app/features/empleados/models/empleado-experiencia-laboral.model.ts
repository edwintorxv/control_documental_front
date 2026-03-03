import { Empleado } from "./empleado.model";

export interface EmpleadoExperienciaLaboral {

    id: number,
    empleado: Empleado;
    nombreEmpresa: string;
    direccionEmpresa: string;
    telefono: string;
    nombreJefeDirecto: string;
    cargoDesempenio: string;
    fechaIngreso: Date;
    fechaRetiro: Date;

}