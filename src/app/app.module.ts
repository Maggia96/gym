import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { SociosComponent } from './Componentes/socios/socios.component';
import { HomeComponent } from './Componentes/home/home.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalClienteComponent } from './Componentes/modal-cliente/modal-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadScreenComponent } from './Componentes/load-screen/load-screen.component';
import { PagosComponent } from './Componentes/pagos/pagos.component';
import { ModalPagosComponent } from './Componentes/modal-pagos/modal-pagos.component';
import { ModalRegistrarIngresoComponent } from './Componentes/modal-registrar-ingreso/modal-registrar-ingreso.component';
import { NotificarComponent } from './Componentes/notificar/notificar.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';
import { LoginComponent } from './Componentes/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SociosComponent,
    HomeComponent,
    ModalClienteComponent,
    LoadScreenComponent,
    PagosComponent,
    ModalPagosComponent,
    ModalRegistrarIngresoComponent,
    NotificarComponent,
    EstadisticasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      
    })
    ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
