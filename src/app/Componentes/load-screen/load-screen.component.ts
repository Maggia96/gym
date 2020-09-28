import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersServiceService } from 'src/app/servicios/helpers-service.service';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css']
})
export class LoadScreenComponent implements OnInit {

  

  constructor(public root : Router , public helpers : HelpersServiceService, public load : LoadingService
    ) { 
   
  }

  ngOnInit() {
  }

}
