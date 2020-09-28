import { Component, OnInit } from '@angular/core';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
import { LoadingService } from 'src/app/servicios/loading.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string;
  Password:string;
  constructor( public helper : HelpersServiceService , public root : Router ,
     public toastr : ToastrService , public load :LoadingService) { }

  ngOnInit() {
    if(localStorage.getItem("logueado")){
      this.root.navigate(["home"])
      this.helper.EstaLogueado = true;
    }
    else{
      this.helper.EstaLogueado = false;
    }
   this.load.cancelarLoad();
  }

  Acceder(){
   this.load.iniciarLoad();
    if(this.Password == this.helper.Password && this.usuario == this.helper.usuario){
      this.helper.EstaLogueado = true;
       localStorage.setItem("logueado","true");
      this.root.navigate(["home"]);

      setTimeout(() => {
        this.load.cancelarLoad();
        this.toastr.info("Bienvenido");
      }, 500);
    }
    else{
    
    setTimeout(() => {
      this.load.cancelarLoad();
      this.toastr.error("Usuario o contraseña incorrecta");
    }, 500); 
  }
  }
}
