import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/modelos/factura';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  usuario: Usuario
  factura: Factura;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    const facturaJSON = sessionStorage.getItem('factura-revision');
    if (usuarioJSON && facturaJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.factura = JSON.parse(facturaJSON);
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  calcularSubtotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    sessionStorage.removeItem('factura-revision');
    sessionStorage.removeItem('pedido-revision');
    this.router.navigate(['inicio-sesion']);
  }
}
