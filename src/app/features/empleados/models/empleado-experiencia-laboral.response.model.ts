import { EmpleadoExperienciaLaboral } from "./empleado-experiencia-laboral.model";

export interface EmpleadoExperienciLaboralResponse {
    metadata: any[];
    empleadoLaboralResponse: {
        lstEmpleadoLaboral: EmpleadoExperienciaLaboral[];
        empleadoExperienciaLaboral: EmpleadoExperienciaLaboral | null;
    }

}