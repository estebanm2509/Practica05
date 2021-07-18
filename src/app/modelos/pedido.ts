import { Cliente } from "./cliente";
import { PedidoDetalle } from "./pedido-detalle";

export class Pedido {

    id: number;
    fecha: Date;
    cliente: Cliente;
    estado: string;
    detalles: PedidoDetalle[];
    subtotal: number;

    constructor() {
        this.fecha = new Date();
        this.estado = "ENVIADO";
        this.detalles = [];
    }

    calcularSubtotal(): void {
        this.subtotal = 0;
        this.detalles.forEach(detalle => {
            this.subtotal += detalle.calcularSubtotal();
        })
    }
}