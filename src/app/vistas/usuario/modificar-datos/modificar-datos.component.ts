import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {

  mensaje:string;
  usuario: Usuario;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  guardarCambios(): void {

  }
}
