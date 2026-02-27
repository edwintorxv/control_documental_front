import { Cargo } from "./cargo.model";

export interface CargoResponseWraper {
    metadata: any[];
    cargoResponse: {
        lstCargo: Cargo[];
        cargo: Cargo | null;

    }
}