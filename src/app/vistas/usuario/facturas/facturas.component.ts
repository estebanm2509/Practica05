import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/modelos/factura';
import { Usuario } from 'src/app/modelos/usuario';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  
  usuario: Usuario;
  facturas: Factura[];
  
  constructor(
    private servicioPedido: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.servicioPedido.listarFacturas(this.usuario.duenio.id)
        .subscribe(
          facturas => this.facturas = facturas
        );
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    sessionStorage.removeItem('factura-revision');
    sessionStorage.removeItem('pedido-revision');
    this.router.navigate(['inicio-sesion']);
  }

  verDetalleFactura(id: number): void {
    let factura = this.facturas.find(factura => factura.id == id);
    if (factura) {
      sessionStorage.setItem('factura-revision',JSON.stringify(factura));
      this.router.navigate(['cuenta/facturas/' + id]);
    }
  }
}
