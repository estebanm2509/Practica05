import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  cedula: string;
  correo: string;
  contrasenia: string;
  mensaje: string;

  constructor(private servicioUsuario: UsuarioService) {}

  ngOnInit(): void {
  }

  crearCuenta(): void {
    if (!this.cedula && !this.correo && !this.contrasenia) {
      this.mensaje = 'Debe ingresar los campos solicitados.';
    } else if (!this.cedula || !this.correo || !this.contrasenia) {
      this.mensaje = 'Uno o más campos esta vacío.';
    } else {
      this.servicioUsuario
      .crearCuenta(this.cedula, this.correo, this.contrasenia)
      .subscribe(
        casoExitoso => {
          if (casoExitoso) {
            this.mensaje = "Usuario registrado correctamente.";
          } else {
            this.mensaje = "El usuario ya se encuentra registrado.";
          };
          this.limpiarCampos();
        }, 
        casoFallido => {
          this.mensaje = casoFallido.error;
        }
      )
    }
  }

  limpiarCampos(): void {
    this.cedula = '';
    this.correo = '';
    this.contrasenia = '';
  }
}
