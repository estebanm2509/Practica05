import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CrearCuentaComponent } from './vistas/crear-cuenta/crear-cuenta.component';
import { InicioSesionComponent } from './vistas/inicio-sesion/inicio-sesion.component';
import { FacturasComponent } from './vistas/usuario/facturas/facturas.component';
import { ModificarDatosComponent } from './vistas/usuario/modificar-datos/modificar-datos.component';
import { UsuarioComponent } from './vistas/usuario/usuario.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'cuenta/pedidos', component: UsuarioComponent},
  {path: 'cuenta/facturas', component: FacturasComponent},
  {path: 'cuenta', component: ModificarDatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
