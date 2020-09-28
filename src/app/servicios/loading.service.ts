import { Injectable } from '@angular/core';
import { HelpersServiceService } from './helpers-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  Vencido : boolean;

  constructor(public helpers : HelpersServiceService) {
    this.Vencido = true;
  }

  async iniciarLoad() {
   
   
      this.helpers.startuploading = true;
     }
   
     async iniciarLoadStartUp() {
 
     }
     
   
     async cancelarLoad() {
   
      setTimeout(() => {
        this.helpers.startuploading = false; 
      }, 1000);
       
     }
   
}
