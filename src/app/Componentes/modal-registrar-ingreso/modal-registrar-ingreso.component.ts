import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/servicios/loading.service';
import { CuotaServicioService } from 'src/app/servicios/cuota-servicio.service';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { clienteDto } from 'src/app/Dto/cliente.Dto';
declare var $: any;

@Component({
  selector: 'app-modal-registrar-ingreso',
  templateUrl: './modal-registrar-ingreso.component.html',
  styleUrls: ['./modal-registrar-ingreso.component.css']
})
export class ModalRegistrarIngresoComponent implements OnInit {

  modalId = "ingreso";
  dni: string;
  fotoUrl: string;
  debeCuotaSocio: boolean;
  nombre: string;
  cliente: clienteDto = new clienteDto();
  ocultar: boolean;
vencido :boolean;
  @ViewChild("inputDni", { static: false }) input: ElementRef;

  constructor(   public ClienteServicio: ClienteServicioService,
    public toastr: ToastrService,
    public loading: LoadingService,
    public cuotaServicio: CuotaServicioService,
    public helper : HelpersServiceService,) { 
      this.dni = "";
      this.debeCuotaSocio = false;
      this.fotoUrl = this.cliente.path;
      this.nombre = this.cliente.apellido + " " + this.cliente.nombre;
      this.ocultar = true;
      this.vencido = false;
    }

  ngOnInit() {
  }
  open() {
    $(`#${this.modalId}`).modal("show");
    this.input.nativeElement.focus();
  }

  dismiss() {
    $(`#${this.modalId}`).modal("hide");
  }

  Registrar() {
    if (this.cliente[0] == null) {
      this.toastr.error("NO SELECCIONO NINGUN CLIENTE");
      this.limpiar2();
      return;
    }
    this.dni = this.cliente[0].dni;

    this.loading.iniciarLoad();
    this.ClienteServicio.registrarIngreso(this.dni).subscribe(
      res => {
        this.toastr.success(
          "se registro correctamente el ingreso de " +
            this.cliente[0].nombre +
            " " +
            this.cliente[0].apellido
        );
     

     
        this.limpiar();
        this.loading.cancelarLoad();
      },
      err => {
        this.loading.cancelarLoad();
        this.toastr.error("ocurrio un error intente mas tarde");
      }
    );
  }

  Buscar() {
    this.dni = this.dni.trim();

    if (this.dni == "") {
      this.toastr.info("Debe ingresar un dni");
      this.limpiar2();
      return;
    }
    
    this.loading.iniciarLoad();

    this.ClienteServicio.getClientePorDni(this.dni).subscribe((data: any) => {
      
      if(!data.data.success){
        this.limpiar2();
        this.ocultar = true;
        this.loading.cancelarLoad();
        this.toastr.error("No existe ningun socio con ese DNI");
        return;
      }else {
        this.cliente = data.data.cliente;
        this.fotoUrl = this.cliente[0].path;
        this.loading.cancelarLoad();
        this.ocultar = false;
      }
      
console.log(data);

      if (data.data.Vencido) {
        this.debeCuotaSocio = true;
        this.nombre = this.cliente[0].apellido + " " + this.cliente[0].nombre;
      } else {
        this.debeCuotaSocio = false;
        this.nombre = this.cliente[0].apellido + " " + this.cliente[0].nombre;
      }
    });
  }

  limpiar() {
    this.cliente = new clienteDto();
    this.fotoUrl = this.cliente.path;
    this.dni = "";
    this.debeCuotaSocio = false;
    this.nombre = "";
    this.ocultar = true;
    this.cuotaServicio.creandoCuotaNueva = false;
  }

  limpiar2() {
    this.cliente = new clienteDto();
    this.fotoUrl = this.cliente.path;
    this.dni = "";
    this.debeCuotaSocio = false;
    this.nombre = "";
    this.ocultar = true;
  }

  generarCuota() {
    if (this.cliente[0] == null) {
      this.limpiar2();
      this.ocultar = true;
      this.loading.cancelarLoad();
      this.toastr.error("No existe ningun socio con ese DNI");

      return;
    }
    this.asignarCliente();

    this.limpiar();
  }

  asignarCliente() {
    this.ClienteServicio.clienteSeleccionado = this.cliente[0];
  }

  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

    
  }
}
