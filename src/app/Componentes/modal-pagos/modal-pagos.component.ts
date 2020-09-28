import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { cuotaDto } from 'src/app/Dto/cuota-Dto';
import { LoadingService } from 'src/app/servicios/loading.service';
import { ToastrService } from 'ngx-toastr';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { CuotaServicioService } from 'src/app/servicios/cuota-servicio.service';
import { Router } from '@angular/router';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { clienteDto } from 'src/app/Dto/cliente.Dto';

declare var $: any;

@Component({
  selector: 'app-modal-pagos',
  templateUrl: './modal-pagos.component.html',
  styleUrls: ['./modal-pagos.component.css']
})
export class ModalPagosComponent implements OnInit {

  @ViewChild("inputDni", { static: false }) input: ElementRef;

  modalId = "ingreso";

  cuota: cuotaDto = new cuotaDto();

  @Output() reload = new EventEmitter<any>();

  montoFinal:Number;
  constructor(  public clienteService: ClienteServicioService,
    public Loading: LoadingService,
    public toastr: ToastrService,
    public helper: HelpersServiceService,
    public cuotaservicio: CuotaServicioService,
    public root: Router) {
    
      this.montoFinal = 0;
   }

  ngOnInit() {
  }

  

  salir() {
    this.montoFinal = 0;
    this.clienteService.clienteSeleccionado = new clienteDto();
    this.cuota = new cuotaDto();
  
    this.reload.emit();
    $("#modalCuota").modal("hide");
  }



  formarCuota() {
    this.cuota.dniCliente = this.clienteService.clienteSeleccionado.dni;
 
  }

  crearCuota() {
    this.Loading.iniciarLoad();
    this.formarCuota();
  console.log(this.cuota, "la cuota");
    this.cuotaservicio.crearCuota(this.cuota).subscribe(
      (res:any) => {
        if(res.data.success){
          this.salir();
          this.toastr.success(res.data.mensaje);
          this.Loading.cancelarLoad();
          this.cuotaservicio.creandoCuotaNueva = false;
        }else{
          this.toastr.error(res.data.mensaje);
          this.Loading.cancelarLoad();
        }
        
      }
    );
  }

  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

    
  }

  open() {
    $(`#${this.modalId}`).modal("show");
    this.input.nativeElement.focus();
  }

  dismiss() {
    $(`#${this.modalId}`).modal("hide");
  }
}
