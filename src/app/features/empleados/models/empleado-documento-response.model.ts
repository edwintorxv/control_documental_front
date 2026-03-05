import { EmpleadoDocumento } from "./empleado-documento.model";

export interface EmpleadoDocumentoResponse {

    metadata: any[];
    empleadoDocumentoResponse: {
        lstEmpleadoDocumento: EmpleadoDocumento[];
        empleadoDocumento: EmpleadoDocumento | null;
    }

}