import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = 'http://localhost:8080/Practica04/rest/usuarios';

  constructor(private http: HttpClient) {}

  iniciarSesion(correo: string, contrasenia: string): Observable<any> {
    return this.http.get(`${this.url}/iniciar-sesion?correo=${correo}&contrasenia=${contrasenia}`);
  }

  crearCuenta(cedula:string, correo: string, contrasenia: string): Observable<any> {
    const formulario = new HttpParams()
      .set('cedula', cedula)
      .set('correo', correo)
      .set('contrasenia', contrasenia);
    return this.http.post(`${this.url}/crear-cuenta`, formulario);
  }

  modificarCuentaUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(`${this.url}/modificar-cuenta-usuario`, usuario);
  }

  modificarDatosPersonales(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.url}/modificar-datos-personales`, cliente);
  }

  eliminarCuenta(correo: string): Observable<any> {
    return this.http.delete(`${this.url}/eliminar-cuenta?correo=${correo}`);
  }

  buscar(correo: any): Observable<any> {
    return this.http.get(`${this.url}/buscar?correo=${correo}`);
  }
}
