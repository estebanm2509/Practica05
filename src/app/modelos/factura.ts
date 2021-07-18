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

    static readonly IVA:number = 0.12;

    constructor() {
        this.activa = true;
        this.fecha = new Date();
        this.detalles = [];
    }

    calcularSubtotal(): void {
        this.subtotal = 0;
        this.detalles.forEach(detalle => {
            this.subtotal += detalle.calcularSubtotal();
        })
    }

    calcularTotal(): void {
        this.total = this.subtotal + (this.subtotal * Factura.IVA);
    }
}