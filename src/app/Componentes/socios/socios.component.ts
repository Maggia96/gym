import { Component, OnInit } from '@angular/core';

import { LoadingService } from 'src/app/servicios/loading.service';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { HttpClient } from '@angular/common/http';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { ToastrService } from "ngx-toastr";
import { clienteDto } from 'src/app/Dto/cliente.Dto';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  client: clienteDto[];
  buscarDni: string;
  Accesos: Date[];
  page: number;
  pageButton: boolean;
  nextButton : boolean;
  TotalClientes : number;
  DNI: [];

  constructor(
    public http: HttpClient,
    public clienteservice: ClienteServicioService,
    public loadingservice: LoadingService,
    public helper: HelpersServiceService,
    public toastr : ToastrService
    
  ) {
    this.buscarDni = "";
    this.page = 0;
    this.pageButton = true;
   this.nextButton = true;
   this.TotalClientes = 0;
   this.DNI = []
  }

  ngOnInit() {
   
    this.cargarclientes();
 
  }

  cargarclientes() {
    this.loadingservice.iniciarLoad();

    this.clienteservice.getClientes(this.page).subscribe((data: any) =>
  
      setTimeout(() => {
     
        if( !data.data.success){
          this.loadingservice.cancelarLoad();
          this.toastr.info(data.data.mensaje);
          this.client = [];
          this.client = data.data.clientes;
       return;
        }else{
          this.client = [];
          this.client = data.data.clientes;
          console.log(data.data.clientes.length, "hola")
        console.log(this.client);
          this.loadingservice.cancelarLoad();
  
        }
              
      }
      )
    );
  }

  cargarclientesActivos() {
    this.loadingservice.iniciarLoad();

    this.clienteservice.getClientesActivos().subscribe((data: any) =>
  
      setTimeout(() => {
     
        if( !data.data.success){
          this.loadingservice.cancelarLoad();
          this.toastr.info(data.data.mensaje);
          this.client = [];
          this.client = data.data.clientes;
       return;
        }else{
          this.client = [];
          this.client = data.data.clientes;
          console.log(data.data.clientes.length, "hola")
        console.log(this.client);
          this.loadingservice.cancelarLoad();
  
        }
              
      }
      )
    );
  }


  cargarAllClientes() {
    this.loadingservice.iniciarLoad();

    this.clienteservice.getAllClientes().subscribe((data: any) =>
  
      setTimeout(() => {
     
        if( !data.data.success){
          this.loadingservice.cancelarLoad();
          this.toastr.info(data.data.mensaje);
      
       return;
        }else{
           let DNI2 = [];
           DNI2 = data.data.clientes;
           console.log(DNI2);
           let indiceDos : number;
           indiceDos = 0;
          this.client = [];
let hola =[]
          for (let index = 0; index < DNI2.length; index++) {
              hola[index] = DNI2[index].dni;
            
          }
          console.log(hola);
           for (let index = 0; index < hola.length; index++) {
            this.clienteservice.getClientePorDni(hola[index]).subscribe((data2: any) => {
             console.log(data2);
              if(data2.data.Vencido){
                  this.client[indiceDos] = data2.data.cliente[0];
                indiceDos++;
                }
        
            });
             
           }
          

          console.log(this.client, "hola")
      
          this.loadingservice.cancelarLoad();
  
        }
              
      }
      )
    );
  }

  buscarPorDni() {
    

    if (this.buscarDni == "") {
      this.cargarclientes();
      return;
    }
    this.loadingservice.iniciarLoad();

    this.clienteservice.getClientePornombre(this.buscarDni).subscribe((data: any) =>
    
      setTimeout(() => {
       
        this.client = [];
        this.client = data;
      
       if(this.client.length === 0){
        
         this.toastr.error("no se encontro ningun socio");
       }
        this.loadingservice.cancelarLoad();
      }
     )
    );
  }

  nuevoCliente() {
    
    this.clienteservice.clienteNuevo = true;
    this.clienteservice.clienteSeleccionado = new clienteDto();
    
    console.log(this.clienteservice.clienteSeleccionado);
  }

  modificarCliente(cliente: clienteDto) {
    this.clienteservice.clienteNuevo = false;
    this.clienteservice.clienteSeleccionado = cliente;
    console.log(this.clienteservice.clienteSeleccionado);
  }

  verAccesos(cliente: clienteDto) {
    this.clienteservice.clienteNuevo = false;
    this.clienteservice.clienteSeleccionado = cliente;
  }

  verListado() {
    this.helper.lista = !this.helper.lista;
  }

  next() {
    this.pageButton = false;
    this.page += 8;
    this.loadingservice.iniciarLoad();
    this.clienteservice.getClientes(this.page+8).subscribe((data: any) => {
      if(!data.data.success){
         this.nextButton = false;
      
        }
    this.clienteservice.getClientes(this.page).subscribe((data: any) => {
     this.client = [];
      this.client = data.data.clientes;
      
      window.scroll(0, 0);
      this.loadingservice.cancelarLoad();
    });
   
      
    });
  }

  previous() {
    this.page -= 8;
    this.nextButton = true;
    if (this.page == 0) {
      this.pageButton = true;
    }

    this.loadingservice.iniciarLoad();
    this.clienteservice.getClientes(this.page).subscribe((data: any) => {
      this.client = data.data.clientes;
      window.scroll(0, 0);
      this.loadingservice.cancelarLoad();
    });
  }

 

 
  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

    
  }

}
