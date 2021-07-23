import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {

  mensaje: string;
  usuario: Usuario;

  constructor(
    private servicioUsuario: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario-vigente');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  guardarCambios(): void {
    this.servicioUsuario.modificarDatosPersonales(this.usuario.duenio)
      .subscribe(
        res => {
          this.mensaje = 'Los datos han sido modificados correctamente.';
        }, 
        error => {
          console.log(error);
        }
      );
    this.servicioUsuario.modificarCuentaUsuario(this.usuario)
    .subscribe(
      res => {
        sessionStorage.setItem('usuario-vigente', JSON.stringify(this.usuario));
      }, 
      error => {
        console.log(error);
      }
    );
  }

  eliminarCuenta(): void {
    if (confirm('¿Estas seguro que deseas eliminar esta cuenta?')) {
      this.servicioUsuario.eliminarCuenta(this.usuario.correo)
        .subscribe(
          res => {
            sessionStorage.removeItem('usuario-vigente');
            this.router.navigate(['inicio-sesion']);
          },
          error => {
            console.log(error);
          }
      );
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario-vigente');
    sessionStorage.removeItem('factura-revision');
    sessionStorage.removeItem('pedido-revision');
    this.router.navigate(['inicio-sesion']);
  }
}
