import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bodega } from 'src/app/modelos/bodega';
import { Existencia } from 'src/app/modelos/existencia';
import { PedidoDetalle } from 'src/app/modelos/pedido-detalle';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  mensaje: string;
  bodegas: Bodega[];
  bodegaSeleccionada: Bodega;
  categorias: string[];
  categoriaSeleccionada: string;
  existencias: Existencia[];
  existenciasFiltradas: Existencia[];

  carrito: PedidoDetalle[] = [];

  constructor(
    private servicioPedido: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriaSeleccionada = 'TODAS';
    this.servicioPedido.listarBodegas()
      .subscribe(
        bodegas => {
          this.bodegas = bodegas;
          this.bodegaSeleccionada = this.bodegas[0];
        }
      );
    this.servicioPedido.listarCategorias()
      .subscribe(
        categorias => {
          this.categorias = categorias;
        }
      );
    this.servicioPedido.listarProductos(1)
      .subscribe(
        existencias => {
          this.existencias = existencias;
          this.existenciasFiltradas = existencias;
        }
      );
  }

  filtrarProductos(): void {
    if (this.categoriaSeleccionada === 'TODAS') {
      this.existenciasFiltradas = this.existencias;
    } else {
      this.existenciasFiltradas = this.existencias.filter(
        existencia => existencia.producto.categoria === this.categoriaSeleccionada
      );
    }
  }

  agregarAlCarrito(existencia: Existencia): void {
    if (existencia.cantidad == 0) {
      this.mensaje = "No existen unidades disponibles de " + existencia.producto.descripcion + '.';
    } else {
      if(!this.carrito.find(datos => datos.producto == existencia.producto)) {
        let detalle: PedidoDetalle = new PedidoDetalle();
        detalle.producto = existencia.producto;
        detalle.cantidad = 1;
        this.carrito.push(detalle);
      } else {
        let cantidad = 0;
        this.carrito = this.carrito.map(
          detalle => {
            if (detalle.producto == existencia.producto) {
              detalle.cantidad +=1;
            }
            return detalle;
          }
        );
      }
      existencia.cantidad -= 1;
    }
  }

  quitarDelCarrito(existencia: Existencia): void {
    let detalleEncontrado = this.carrito.find(datos => datos.producto == existencia.producto);
    if(detalleEncontrado !== undefined) {
      let estaVacio = false;
      this.carrito = this.carrito.map(
        detalle => {
          if (detalle.producto == existencia.producto) {
            detalle.cantidad -=1;
            estaVacio = detalle.cantidad == 0;
          }  
          return detalle;
        }
      );
      if (estaVacio) {
        const indice = this.carrito.indexOf(detalleEncontrado);
        this.carrito.splice(indice, 1);
      }
      existencia.cantidad += 1;
    }
  }
}
