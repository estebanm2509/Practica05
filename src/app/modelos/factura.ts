import { Cliente } from "./cliente";
import { FacturaDetalle } from "./factura-detalle";

export class Factura {

    id: number;
    fecha: Date;
    cliente: Cliente;
    detalles: FacturaDetalle[];
    subtotal: number;
    total: number;
    activa: boolean;

    static readonly IVA: number = 0.12;

    constructor() {
        this.activa = true;
        this.detalles = [];
    }
}