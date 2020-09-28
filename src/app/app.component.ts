import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersServiceService } from './servicios/helpers-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gym-Php';
  constructor(private root: Router , public helper : HelpersServiceService){

  }
  ngOnInit(){
    this.root.navigate(["login"])
  }
}
