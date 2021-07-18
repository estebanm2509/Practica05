import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega } from '../modelos/bodega';
import { Pedido } from '../modelos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url: string = 'http://localhost:8080/Practica04/rest/pedidos'

  constructor(private http: HttpClient) { }

  listarProductos(bodega_id: number): Observable<any> {
    return this.http.get(`${this.url}/listar?bodega-id=${bodega_id}`);
  }

  realizarPedido(pedido: Pedido): Observable<any> {
    return this.http.post<Pedido>(`${this.url}/realizar-pedido`, pedido);
  }

  revisarEstadoPedido(id: number): Observable<any> {
    return this.http.get(`${this.url}/revisar-estado-pedido?id=${id}`);
  }
}
