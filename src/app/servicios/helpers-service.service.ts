import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersServiceService {

  EstaLogueado: boolean;
  homePage: boolean;
  lista: boolean;
  clientepage: boolean;
  startuploading: boolean;
  usuario:string;
  Password:string;
  MostrarListaAccesos : boolean;
  constructor() {
    
    this.MostrarListaAccesos = false
    this.EstaLogueado = false;
    this.startuploading = false;
    this.clientepage = true;
    this.homePage = false;
    this.lista = false;
    this.usuario = "admin";
    this.Password = "1234"
  }
}
