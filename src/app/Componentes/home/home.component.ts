import { Component, OnInit } from '@angular/core';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hoy : string = new Date().toString();
  dia : string = "Sat Feb 03 2020 19:14:27 GMT-0300";
  constructor(
    private loadind : LoadingService
  ) { }

  ngOnInit() {
    
    if(false){
      this.loadind.Vencido = false;

     this.loadind.iniciarLoad();
    }
    else{
     
    }
  }

}
