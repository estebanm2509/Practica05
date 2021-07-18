import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/modelos/factura';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  factura: Factura[];

  constructor(
    private servicioUsuario: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = localStorage.getItem('usuario-vigente');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario-vigente');
    this.router.navigate(['inicio-sesion']);
  }
}
