import { EmpleadoDocumento } from "./empleado-documento.model";

export interface EmpleadoDocumentoResponse {

    metadata: any[];
    empleadoDocumentoResponse: {
        lstEmpleadoDocumento: EmpleadoDocumento[];
        empleadorFamiliar: EmpleadoDocumento | null;
    }

}