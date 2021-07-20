import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modelos/pedido';
import { Usuario } from 'src/app/modelos/usuario';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  pedidos: Pedido[];

  constructor(
    private servicioPedido: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
      this.servicioPedido.listarPedidos(this.usuario.duenio.id)
        .subscribe(
          pedidos => this.pedidos = pedidos
        );
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    this.router.navigate(['inicio-sesion']);
  }

  verDetallePedido(id: number): void {
    
  }
}
