import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoService } from './servicios/pedido.service';
import { UsuarioService } from './servicios/usuario.service';
import { InicioSesionComponent } from './vistas/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './vistas/crear-cuenta/crear-cuenta.component';
import { UsuarioComponent } from './vistas/usuario/usuario.component';
import { ModificarDatosComponent } from './vistas/usuario/modificar-datos/modificar-datos.component';
import { FacturasComponent } from './vistas/usuario/facturas/facturas.component';
import { CatalogoComponent } from './vistas/catalogo/catalogo.component';
import { ConfirmarPedidoComponent } from './vistas/catalogo/confirmar-pedido/confirmar-pedido.component';
import { DetallePedidoComponent } from './vistas/usuario/detalle-pedido/detalle-pedido.component';
import { DetalleFacturaComponent } from './vistas/usuario/facturas/detalle-factura/detalle-factura.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CrearCuentaComponent,
    UsuarioComponent,
    ModificarDatosComponent,
    FacturasComponent,
    CatalogoComponent,
    ConfirmarPedidoComponent,
    DetallePedidoComponent,
    DetalleFacturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
