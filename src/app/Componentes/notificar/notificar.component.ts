import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { ToastrService } from 'ngx-toastr';
import { clienteDto } from 'src/app/Dto/cliente.Dto';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localePy, 'es');

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnInit {

  client: clienteDto[];
  buscarDni: number;
  fecha: Date;


  constructor( public http: HttpClient,
    public clienteservice: ClienteServicioService,
    public loadingservice: LoadingService,
    public helper: HelpersServiceService,
    public toastr : ToastrService) { 
      this.buscarDni = 1;
    
   
  }
  ngOnInit() {
   
    this.cargarclientes(1);
 
  }

  cargarclientes(dias : number) {
    this.loadingservice.iniciarLoad();

    this.clienteservice.getClientesPorVencer(dias).subscribe((data: any) =>
  
      setTimeout(() => {
     
        if( !data.data.success){
          this.loadingservice.cancelarLoad();
          this.toastr.info(data.data.mensaje);
          this.client = [];
          this.client = data.data.clientes;
          this.fecha = data.data.fecha;   
          console.log(data , "bien");
       return;
        }else{
          this.client = [];
          this.client = data.data.clientes;
          this.fecha = data.data.fecha;
          console.log(data , "mal");
          this.loadingservice.cancelarLoad();
  
        }
              
      }
      )
    );
  }

  


 

  buscarPorDni() {
    if(this.buscarDni == null){
      return;
    }
this.cargarclientes(this.buscarDni);
  
   
  }

  
notificar(){
  this.clienteservice.Notificar().subscribe();
}


 

  verListado() {
    this.helper.lista = !this.helper.lista;
  }

 

 
 

 
  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

    
  }


}
