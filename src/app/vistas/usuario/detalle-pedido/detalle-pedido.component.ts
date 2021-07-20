import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modelos/pedido';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  usuario: Usuario;
  pedido: Pedido;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    const pedidoJSON = sessionStorage.getItem('pedido-revision');
    if (usuarioJSON && pedidoJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.pedido = JSON.parse(pedidoJSON);
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  calcularSubtotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }

  calcularTotal(): number {
    return this.pedido.subtotal + (this.pedido.subtotal * 0.12);
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    sessionStorage.removeItem('factura-revision');
    sessionStorage.removeItem('pedido-revision');
    this.router.navigate(['inicio-sesion']);
  }
}
