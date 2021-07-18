import { Producto } from "./producto";

export class FacturaDetalle {

    id: number;
    producto: Producto;
    cantidad: number;

    constructor() {}
    
    calcularSubtotal(): number {
        return this.producto.precio * this.cantidad;
    }
}