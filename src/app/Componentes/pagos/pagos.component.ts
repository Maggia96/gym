import { Component, OnInit, ViewChild } from '@angular/core';
import { CuotaServicioService } from 'src/app/servicios/cuota-servicio.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { cuotaDto } from 'src/app/Dto/cuota-Dto';
import { ToastrService } from 'ngx-toastr';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { clienteDto } from 'src/app/Dto/cliente.Dto';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ThrowStmt } from '@angular/compiler';
import { ModalPagosComponent } from '../modal-pagos/modal-pagos.component';
import { ModalRegistrarIngresoComponent } from '../modal-registrar-ingreso/modal-registrar-ingreso.component';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localePy, 'es');
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @ViewChild("registro", { static: false })
  modal: ModalRegistrarIngresoComponent;

  total: number;

  cuotasPagadas: [];

  cliente: clienteDto = new clienteDto();

  id: string;

  buscarDni: string;

  busquedaPorCliente: boolean;

  anulada: number;
 
  cuotaELiminarId : string;

  eliminarConsulta : boolean;

  anio : string;
  cuotas : cuotaDto[];
  constructor(private cuotaServicio : CuotaServicioService , 
    private loading : LoadingService ,
    private toastr : ToastrService,
    public clienteServicio : ClienteServicioService) {
      this.buscarDni = "";
    this.total = 0;
    this.id = "";
    this.busquedaPorCliente = false;
  this.eliminarConsulta = false;
this.cuotaELiminarId = "";  
 this.anio = "";
     }

    ngOnInit() {
      
      setTimeout(() => {
       this.cargarPagos();
        
      }, 800);
       
    
   }
  

  cargarPagos(){
    this.loading.iniciarLoad();

    this.cuotaServicio.getCuotasDelDia().subscribe((data: any) =>
  
      setTimeout(() => {
     
        if(!data.data.success){
          this.loading.cancelarLoad();
          this.toastr.info(data.data.mensaje);
          this.cuotasPagadas = [];
          this.cuotasPagadas = data.data.cuotases;
          console.log(data);
       return;
        }else{
          this.cuotasPagadas = [];
          this.cuotasPagadas = data.data.cuotas;
          this.total = data.data.total.total;
        console.log(data);
       
          this.loading.cancelarLoad();
  
        }
              
      }
      )
    );
  }





 crearCuotaNueva() {
 
   this.cuotaServicio.creandoCuotaNueva = true;
 }

 anular() {
   if (this.anulada === 0) {
     this.toastr.error("la cuota esta anulada");
     return;
    
   }

   if(!this.eliminarConsulta)
   {
      return;
   };
   
   this.loading.iniciarLoad();
   this.cuotaServicio.deleteCuota(this.cuotaELiminarId).subscribe(
     (res: any) => {
       this.loading.cancelarLoad();
       this.toastr.success(res.data.mensaje);
       this.eliminarConsulta = false;
       this.cargarPagos();
     },
     (err: any) => {
       this.loading.cancelarLoad();
       this.toastr.error(err.message);
       this.eliminarConsulta = false;
       this.cargarPagos();
     }
   );
 }

mensajeELiminar(cuota: cuotaDto){
this.cuotaELiminarId = "";
this.cuotaELiminarId = cuota.id;
this.anulada = cuota.Anulada;
 this.eliminarConsulta = true;
}
cancelar(){
 this.cuotaELiminarId = "";
 this.eliminarConsulta = false;
}

 buscarCuotasSocio() {
   
if(this.buscarDni.length < 8){
  this.toastr.info("Documento no Valido");
  return;
}

   if (this.buscarDni == "" ) {
     this.cargarPagos();
     this.busquedaPorCliente = false;
     
     return;
   }
   this.loading.iniciarLoad();
   this.clienteServicio.getClientePornombre(this.buscarDni).subscribe(
     (res: any) => {
       if (res[0] == null) {
         this.loading.cancelarLoad();
         this.toastr.error("no exixte un socio con ese numero de dni");
         return;
       }
   
   
       this.cuotaServicio.buscarCuotasCliente(res[0].dni ,this.anio).subscribe(
         (res: any) => {
           this.cuotasPagadas = res.data.cuotas;
           if(!res.data.success){
            this.toastr.success("El socio no tiene cuotas pagadas");

           }else{
           this.toastr.success("cuotas obtenidas correctamente");
           }
           this.busquedaPorCliente = true;
           this.loading.cancelarLoad();
         }
       );
       this.clienteServicio.clienteSeleccionado = res[0];
       console.log(this.clienteServicio.clienteSeleccionado.path);
     },
     (err: any) => {
       this.loading.cancelarLoad();
       this.toastr.error("no exixte un socio con ese numero de dni");
       this.busquedaPorCliente = false;
     }
   );
 }

 onlyNumberKey(event) {

   return event.charCode == 8 || event.charCode == 0 
     ? null
     : event.charCode >= 48 && event.charCode <= 57;

   
 }

}
