import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { ModalRegistrarIngresoComponent } from '../modal-registrar-ingreso/modal-registrar-ingreso.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild("registro", { static: false })
  modal: ModalRegistrarIngresoComponent;

  constructor(public root: Router, public helpers: HelpersServiceService , public loading : LoadingService ) { }
  iconoActual : string;
  ngOnInit() {
    this.iconoActual = "home";
  }


  CerrarSession() {
    this.helpers.EstaLogueado = false;
    localStorage.removeItem("logueado");
    this.root.navigate(["login"]);
  }

  iniciar(){
    this.loading.iniciarLoad();
  
  }

  ocultarIconoActual(icono : string){
       this.iconoActual = icono;
  }



}
