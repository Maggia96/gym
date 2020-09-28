import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SociosComponent } from './Componentes/socios/socios.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './Componentes/home/home.component';
import { PagosComponent } from './Componentes/pagos/pagos.component';
import { NotificarComponent } from './Componentes/notificar/notificar.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [
  {path:"cliente" , component : SociosComponent},
  {path: "home" , component : HomeComponent},
  {path: "pagos" , component : PagosComponent},
  {path: "notificar" , component : NotificarComponent},
  {path: "estadisticas" , component : EstadisticasComponent},
  {path: "login" , component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
