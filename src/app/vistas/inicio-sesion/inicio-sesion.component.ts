import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  correo:string;
  contrasenia:string;
  mensaje:string;

  constructor(
    private servicioUsuario: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('usuario-vigente')) {
      this.router.navigate(['cuenta/pedidos']);
    }
  }

  iniciarSesion(): void {
    if (!this.correo && !this.contrasenia) {
      this.mensaje = 'Debe ingresar los campos solicitados.';
    } else if (!this.correo || !this.contrasenia) {
      this.mensaje = 'Uno de los campos esta vacío.';
    } else {
      this.servicioUsuario.iniciarSesion(this.correo, this.contrasenia)
      .subscribe(
        casoExitoso => {
          if (casoExitoso) {
            this.servicioUsuario.buscar(this.correo)
              .subscribe(
                usuario => {
                  if (usuario.rol === 'CLIENTE') {
                    sessionStorage.setItem('usuario-vigente', JSON.stringify(usuario));
                    if (sessionStorage.getItem('carrito')) {
                      this.router.navigate(['confirmar-pedido']);
                    } else {
                      this.router.navigate(['cuenta/pedidos']);
                    }
                  } else {
                    this.mensaje = 'Esta cuenta no esta habilitada para ser usada desde este sitio web.';
                  }
                }
              )
          } else {
            this.mensaje = 'La contraseña es incorrecta.'
          }
        },
        casoFallido => {
          this.mensaje = casoFallido.error
        }
      );
    }
  }
}
