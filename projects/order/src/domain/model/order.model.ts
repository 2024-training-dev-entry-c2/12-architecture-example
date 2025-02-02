export interface IOrder {
    id?: number,
    detalles: IDetails[],
    total?: number,
    estado?: string,
    fechaPedido?: Date | number[],
    idCliente: number
}

export interface IDetails{
    cantidad: number,
    precio?: number,
    idPlato: number,
    nombrePlato?: string
}