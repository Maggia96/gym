import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteServicioService } from 'src/app/servicios/cliente-servicio.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/servicios/loading.service';
import { ToastrService } from 'ngx-toastr';
import { clienteDto } from 'src/app/Dto/cliente.Dto';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

  closeResult: string;

  @Input()
  client: clienteDto = new clienteDto();

  @Output()
  reload = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  eliminarCliente : boolean;
  nuevo : boolean;
  Http: any;

  constructor(public clienteService: ClienteServicioService,
    public root: Router,
    public loadingService: LoadingService,
    public toastr: ToastrService,
  ) { 
    this.eliminarCliente = false;
  }

  ngOnInit() {
    if(this.clienteService.clienteSeleccionado.dni === ""){
     this.nuevo = true;
    }
    else{
      this.nuevo = false;
    }

  }

  guardar() {
  

    if (!this.clienteService.clienteNuevo) {
      this.editar()
      this.clienteService.onUpload();
      return;
    }
    this.crear();
    this.clienteService.onUpload();
 
  }


  editar() {
    this.loadingService.iniciarLoad();
    this.ValidarInput();
    if(!this.validarInputsGuardar())
    {
      
      return;
    }
     
    console.log(this.clienteService.clienteSeleccionado);
    this.clienteService.editarCliente(this.clienteService.clienteSeleccionado).subscribe(
      (res:any) => { 
        if(res.data.success){
          this.toastr.success(res.data.mensaje);
        }else{
          this.toastr.error(res.data.mensaje);
        }
        this.reload.emit();
    
        this.loadingService.cancelarLoad();

      },
      err => {
        this.loadingService.cancelarLoad();
      //  this.toastr.error("Ocurrio un error");
      });
  }


  crear() {
    
    this.loadingService.iniciarLoad();
    this.clienteService.clienteSeleccionado.email =   this.clienteService.clienteSeleccionado.email.toLowerCase();
    this.ValidarInput();
    if(!this.validarInputsGuardar())
    {
      return;
    }
    this.clienteService.postCliente(this.clienteService.clienteSeleccionado).subscribe(
      (res:any) => {
       

        this.reload.emit();
        if(res.data.success){
          this.toastr.success(res.data.mensaje);
        }else{
          this.toastr.error(res.data.mensaje);
        }
        
        this.clienteService.clienteSeleccionado = new clienteDto();
        this.loadingService.cancelarLoad();
        
      },
      err => {
        this.toastr.error(err.message.mensaje);
        this.loadingService.cancelarLoad();
        //this.toastr.error("Ocurrio un error");
      });
  }


  eliminar() {
    this.loadingService.iniciarLoad();
   // var r = confirm("¿Seguro que desea eliminar?");
    if (this.eliminarCliente == true) {
      
      this.clienteService.eliminarCliente(this.clienteService.clienteSeleccionado.dni).subscribe(
        
        (res: any) => {
          if (res.data.success) {
            this.eliminarCliente = false;
            this.toastr.success(res.data.mensaje); 
            this.reload.emit();
            this.loadingService.cancelarLoad();
            
          }
          else{
            this.toastr.error(res.data.mensaje);
          }
        },
        err => {
          this.eliminarCliente = false;
          this.loadingService.cancelarLoad();
          //this.toastr.error("Ocurrio un error");
        });
    } else {
      this.loadingService.cancelarLoad();
    }
  }

mensajeEliminar(){
  
  this.eliminarCliente = true;
 
}

cancelar(){
  this.eliminarCliente = false;
  
}

  salir() {
    this.reload.emit();
  }

  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

     
  }

  ValidarInput(){
      this.clienteService.clienteSeleccionado.dni = this.clienteService.clienteSeleccionado.dni.replace(/\s/g, "");
      this.clienteService.clienteSeleccionado.telefono = this.clienteService.clienteSeleccionado.telefono.replace(/\s/g, "");
      this.clienteService.clienteSeleccionado.email = this.clienteService.clienteSeleccionado.email.replace(/\s/g, "");
      this.clienteService.clienteSeleccionado.email = this.clienteService.clienteSeleccionado.email.trim();
      this.clienteService.clienteSeleccionado.nombre = this.clienteService.clienteSeleccionado.nombre.replace(/ +/g, ' ');
      this.clienteService.clienteSeleccionado.apellido = this.clienteService.clienteSeleccionado.apellido.replace(/ +/g, ' ');
      this.clienteService.clienteSeleccionado.direccion = this.clienteService.clienteSeleccionado.direccion.replace(/ +/g, ' ');
      this.clienteService.clienteSeleccionado.email =   this.clienteService.clienteSeleccionado.email.toLowerCase();  
   }
  validarInputsGuardar(){
    if(this.clienteService.clienteSeleccionado.nombre.trim() == "")
    {
      //this.toastr.error("debe ingresar un nombre");
      this.clienteService.clienteSeleccionado.nombre = "";
      this.loadingService.cancelarLoad();
      return false;
   
    };
    if(this.clienteService.clienteSeleccionado.apellido.trim() == "")
    {
      //this.toastr.error("debe ingresar un apellido");
      this.clienteService.clienteSeleccionado.apellido = "";
      this.loadingService.cancelarLoad();
      return false;
    }
    if(this.clienteService.clienteSeleccionado.direccion.trim() == "")
    {
      //this.toastr.error("debe ingresar una direccion");
      this.clienteService.clienteSeleccionado.direccion = "";
      this.loadingService.cancelarLoad();
      return false;
    }
    if(this.clienteService.clienteSeleccionado.dni.length.toString() != "8")
    {
      //this.toastr.error("el dni no es un formato correcto");
      this.clienteService.clienteSeleccionado.dni = "";
      this.loadingService.cancelarLoad();
      return false;
    }
    if(!parseInt(this.clienteService.clienteSeleccionado.dni))
    {
      //this.toastr.error("el dni debe ser solo numerico");
      this.clienteService.clienteSeleccionado.dni = "";
      this.loadingService.cancelarLoad();
      return false;
    }
    
    if(!parseInt(this.clienteService.clienteSeleccionado.telefono))
    {
    //  this.toastr.error("el Telefono debe ser solo numerico");
      this.clienteService.clienteSeleccionado.telefono = "";
      this.loadingService.cancelarLoad();
      return false;
    }
    else{
      return true;
    }
  }

  OnFileChanged(event){
    this.clienteService.selectedfile = event.target.files[0];
    
    this.clienteService.clienteSeleccionado.path = this.clienteService.selectedfile.name;
    }
    
    
      
open(){
  
}
}
