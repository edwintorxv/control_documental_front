export interface ApiResponse<T> {
    metadata: Metadata[];
    data: T;
}

export interface Metadata {
    tipo: string;
    codigo: string;
    descripcion: string;
    ['fecha y hora']: string;
}