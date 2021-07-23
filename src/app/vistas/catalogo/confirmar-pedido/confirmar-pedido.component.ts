import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoDetalle } from 'src/app/modelos/pedido-detalle';
import { Usuario } from 'src/app/modelos/usuario';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {

  usuario: Usuario;
  pedido: Pedido;
  carrito: PedidoDetalle[];
  totalProductoIndividuales: number;

  constructor(
    private servicioPedido: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    const carritoJSON = sessionStorage.getItem('carrito');
    if (usuarioJSON && carritoJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.carrito = JSON.parse(carritoJSON);
      this.pedido = new Pedido();
      this.pedido.cliente = this.usuario.duenio;
      this.pedido.detalles = this.carrito;
      this.totalProductoIndividuales = 0;
      this.carrito.forEach(detalle => this.totalProductoIndividuales += detalle.cantidad);
      this.calcularSubtotal();
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  calcularSubtotal(): void {
    this.pedido.subtotal = 0;
    this.carrito.forEach(detalle => this.pedido.subtotal += detalle.producto.precio * detalle.cantidad);
  }

  calcularTotal(): number {
    return this.pedido.subtotal + (this.pedido.subtotal * 0.12);
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    this.router.navigate(['inicio-sesion']);
  }

  confirmarPedido(): void {
    if (confirm('¿Esta seguro que desea pedir estos productos?')) {
      this.servicioPedido.realizarPedido(this.pedido)
        .subscribe(
          casoExitoso => {
            alert('Pedido realizado con exito.');
            sessionStorage.removeItem('carrito');
            sessionStorage.removeItem('existencias');
            this.router.navigate(['inicio']);
          }, 
          casoFallido => {
            alert('Pedido realizado con exito.');
            sessionStorage.removeItem('carrito');
            sessionStorage.removeItem('existencias');
            this.router.navigate(['inicio']);
          }
        );
    }
  }

  descartarPedido(): void {
    sessionStorage.removeItem('carrito');
    sessionStorage.removeItem('existencias');
    this.router.navigate(['inicio']);
  }
}
