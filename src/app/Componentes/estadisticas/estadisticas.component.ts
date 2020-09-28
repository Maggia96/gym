import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/servicios/loading.service';
import { ToastrService } from 'ngx-toastr';
import { CuotaServicioService } from 'src/app/servicios/cuota-servicio.service';
import { Chart } from "chart.js";
import { ingresosPorMes } from 'src/app/Dto/ingresos-por-mes';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  chart1: Chart;
  IngresosXmes: ingresosPorMes[];
  accesosXmes: ingresosPorMes[];
  cuotas: number[] = new Array;
  titulos: string[] = new Array;
  ingresos : number[] = new Array;
  titulos2: string[] = new Array;
  tipoIngreso : boolean;

  constructor(public cuotaServicio: CuotaServicioService,
    public loadService : LoadingService,
    public toastr : ToastrService,) {
      this.tipoIngreso = true;
    }
    

  ngOnInit() {
    setTimeout(() => {
      this.tipoIngreso = true;
      this.CargarDatos();
    
    }, 800);
    

  }

  CrearGrafica() {
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize = 26;

    this.chart1 = new Chart('canvas',{
      type: 'bar',
      data: {
        labels: this.titulos,
        datasets: [
          {
            borderWidth: 5,
            lineWidth:10,
            label: 'Ingreso',
            data: this.cuotas,
            backgroundColor: ['#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136']
          }
        ]
      },
      options: {
        
        backgroundColor: "transparent",
        title: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 2
            }
          }],
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 2
            },
            display: true,
            
          }]
        }
      }
      
    });
   
  }


//  CrearGrafica2() {
  //  Chart.defaults.global.defaultFontColor = 'white';
   // Chart.defaults.global.defaultFontSize = 26;

 //   this.chart1 = new Chart('canvas2',{
  //    type: 'bar',
   //   data: {
    //    labels: this.titulos2,
     //   datasets: [
      //    {
       //     borderWidth: 5,
        //    lineWidth:10,
         //   label: 'Accesos',
          //  data: this.ingresos,
         //   backgroundColor: ['#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136', '#0074D9', '#2ECC40', '#FF4136']
         // }
       // ]
     // },
    //  options: {
        
     //   backgroundColor: "transparent",
       // title: {
         // display: false,
       // },
       // scales: {
       //   xAxes: [{
      //      display: true,
       //     gridLines: {
       //       color: 'rgba(171,171,171,1)',
       //       lineWidth: 2
       //     }
        //  }],
         // yAxes: [{
          //  ticks: { beginAtZero: true },
           // gridLines: {
           //   color: 'rgba(171,171,171,1)',
            //  lineWidth: 2
            //},
           // display: true,
            
       //   }]
       // }
     // }
      
   // });
   
 // }

  async CargarDatos() {
    this.loadService.iniciarLoad();

    
      

    
    const res = await this.cuotaServicio.traerIngresosPorMes(2020).toPromise() as any;

    console.log(res);
     
  
    
    if(res.data.success){
     this.IngresosXmes = res.data.data;
    
      this.AsignarValoreIngresos();
    
    this.CrearGrafica();
     this.loadService.cancelarLoad();
    }
    else
    {
      this.loadService.cancelarLoad();
     this.toastr.error("ocurrio un error , Intentelo mas tarde");
    }

   
   //   const res2 = await this.cuotaServicio.traerAccesosPorMes().toPromise() as any;

   
     
  
    
   //   if(res2.success){
    //    this.accesosXmes = res2.data;
      
    //    this.AsignarValoreAccesps();
        
       // this.CrearGrafica2();
  //     this.loadService.cancelarLoad();
   //   }
    //  else
    //  {
     //   this.loadService.cancelarLoad();
      // this.toastr.error("ocurrio un error , Intentelo mas tarde");
     // }
  
    
  }

AsignarValoreIngresos(){

  for (let index = 0; index < this.IngresosXmes.length; index++) {
    this.cuotas[index] = this.IngresosXmes[index].total;


  if(this.IngresosXmes[index].mes == 1)
  {
    this.titulos[index] = "En"
  }
  if(this.IngresosXmes[index].mes == 2)
  {
    this.titulos[index] = "Feb"
  }
  if(this.IngresosXmes[index].mes == 3)
  {
    this.titulos[index] = "Mar"
  }
  if(this.IngresosXmes[index].mes == 4)
  {
    this.titulos[index] = "Abril"
  }
  if(this.IngresosXmes[index].mes == 5)
  {
    this.titulos[index] = "May"
  }
  if(this.IngresosXmes[index].mes == 6)
  {
    this.titulos[index] = "Jun"
  }
  if(this.IngresosXmes[index].mes == 7)
  {
    this.titulos[index] = "Jul"
  }
  if(this.IngresosXmes[index].mes == 8)
  {
    this.titulos[index] = "Ago"
  }
  if(this.IngresosXmes[index].mes == 9)
  {
    this.titulos[index] = "Sep"
  }
  if(this.IngresosXmes[index].mes == 10)
  {
    this.titulos[index] = "Oct"
  }
  if(this.IngresosXmes[index].mes == 11)
  {
    this.titulos[index] = "Nov"
  }
  if(this.IngresosXmes[index].mes == 12)
  {
    this.titulos[index] = "Dic"
  }

  };
}

AsignarValoreAccesps(){



  for (let index = 0; index < this.accesosXmes.length; index++) {
    this.ingresos[index] = this.accesosXmes[index].ingresos;


  if(this.accesosXmes[index].mes == 1)
  {
    this.titulos2[index] = "En"
  }
  if(this.accesosXmes[index].mes == 2)
  {
    this.titulos2[index] = "Feb"
  }
  if(this.accesosXmes[index].mes == 3)
  {
    this.titulos2[index] = "Mar"
  }
  if(this.accesosXmes[index].mes == 4)
  {
    this.titulos2[index] = "Abril"
  }
  if(this.accesosXmes[index].mes == 5)
  {
    this.titulos2[index] = "May"
  }
  if(this.accesosXmes[index].mes == 6)
  {
    this.titulos2[index] = "Jun"
  }
  if(this.accesosXmes[index].mes == 7)
  {
    this.titulos2[index] = "Jul"
  }
  if(this.accesosXmes[index].mes == 8)
  {
    this.titulos2[index] = "Ago"
  }
  if(this.accesosXmes[index].mes == 9)
  {
    this.titulos2[index] = "Sep"
  }
  if(this.accesosXmes[index].mes == 10)
  {
    this.titulos2[index] = "Oct"
  }
  if(this.accesosXmes[index].mes == 11)
  {
    this.titulos2[index] = "Nov"
  }
  if(this.accesosXmes[index].mes == 12)
  {
    this.titulos2[index] = "Dic"
  }

  };
}

cambiarGrafica(){
  this.tipoIngreso  = !this.tipoIngreso;
  
}
}
