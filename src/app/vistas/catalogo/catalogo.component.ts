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
  bodegaSeleccionada: number;
  categorias: string[];
  categoriaSeleccionada: string;
  existencias: Existencia[];
  existenciasFiltradas: Existencia[];

  carrito: PedidoDetalle[];
  totalProductoIndividuales: number;

  constructor(
    private servicioPedido: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const carritoJSON = sessionStorage.getItem('carrito');
    if (carritoJSON) {
      this.totalProductoIndividuales = 0;
      this.carrito = JSON.parse(carritoJSON);
      this.carrito.forEach(detalle => this.totalProductoIndividuales += detalle.cantidad);
    } else {
      this.carrito = [];
      this.totalProductoIndividuales = 0;
    }
    this.categoriaSeleccionada = 'TODAS';
    this.servicioPedido.listarBodegas()
      .subscribe(
        bodegas => {
          this.bodegas = bodegas;
          this.bodegaSeleccionada = this.bodegas[0].id;
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
          this.existencias = this.existencias.map(
            existencia => {
              this.carrito.forEach(
                detalle => {
                  if (existencia.producto.id == detalle.producto.id
                    && existencia.cantidad >= detalle.cantidad) {
                    existencia.cantidad -= detalle.cantidad
                  }
                }
              )
              return existencia;
            }
          );
          this.existenciasFiltradas = existencias;
        }
      );
  }

  filtrarProductos(): void {
    this.servicioPedido.listarProductos(this.bodegaSeleccionada)
      .subscribe(
        existencias => {
          this.existencias = existencias;
          this.existencias = this.existencias.map(
            existencia => {
              this.carrito.forEach(
                detalle => {
                  if (existencia.producto.id == detalle.producto.id
                      && existencia.cantidad >= detalle.cantidad) {
                    existencia.cantidad -= detalle.cantidad
                  }
                }
              )
              return existencia;
            }
          );
          this.existenciasFiltradas = existencias;
          if (this.categoriaSeleccionada === 'TODAS') {
            this.existenciasFiltradas = this.existencias;
          } else {
            this.existenciasFiltradas = this.existencias.filter(
              existencia => existencia.producto.categoria === this.categoriaSeleccionada
            );
          }
        }
      );
  }

  agregarAlCarrito(existencia: Existencia): void {
    if (existencia.cantidad == 0) {
      this.mensaje = "No existen unidades disponibles de " + existencia.producto.descripcion + '.';
    } else {
      if(!this.carrito.find(datos => datos.producto.id == existencia.producto.id)) {
        let detalle: PedidoDetalle = new PedidoDetalle();
        detalle.producto = existencia.producto;
        detalle.cantidad = 1;
        this.carrito.push(detalle);
      } else {
        let cantidad = 0;
        this.carrito = this.carrito.map(
          detalle => {
            if (detalle.producto.id == existencia.producto.id) {
              detalle.cantidad +=1;
            }
            return detalle;
          }
        );
      }
      existencia.cantidad -= 1;
      this.totalProductoIndividuales += 1;
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  quitarDelCarrito(existencia: Existencia): void {
    const detalleEncontrado = this.carrito.find(datos => datos.producto.id == existencia.producto.id);
    if(detalleEncontrado !== undefined) {
      let estaVacio = false;
      this.carrito = this.carrito.map(
        detalle => {
          if (detalle.producto.id == existencia.producto.id) {
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
      this.totalProductoIndividuales -= 1;
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  irARealizarPedido() {
    if (this.carrito.length === 0) {
      alert('No existen productos agregados al carrito');
    } else {
      if (sessionStorage.getItem('usuario-vigente')) {
        this.router.navigate(['confirmar-pedido']);
      } else {
        this.router.navigate(['inicio-sesion']);
      }
    }
  }

  descartarPedido(): void {
    this.carrito = [];
    this.totalProductoIndividuales = 0;
    sessionStorage.removeItem('carrito');
    sessionStorage.removeItem('existencias');
    this.servicioPedido.listarProductos(1)
      .subscribe(
        existencias => {
          this.existencias = existencias;
          this.existenciasFiltradas = existencias;
        }
      );
  }
}
