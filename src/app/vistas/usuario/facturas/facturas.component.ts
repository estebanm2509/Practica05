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
    const usuarioJSON = localStorage.getItem('usuario-vigente');
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
    localStorage.removeItem('usuario-vigente');
    this.router.navigate(['inicio-sesion']);
  }

  verDetalleFactura(id: number): void {
    
  }
}
