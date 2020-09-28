import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { cuotaDto } from '../Dto/cuota-Dto';



@Injectable({
  providedIn: "root"
})
export class CuotaServicioService {
 // cuotaSeleccionada: conceptoCuota = new conceptoCuota();
  nuevaCuota: boolean;
  creandoCuotaNueva: boolean;

  constructor(private http: HttpClient) {
    this.creandoCuotaNueva = false;
    this.nuevaCuota = false;
  }

  //========================================Conecepto Cuota ========================================================//
 //// crearConceptoCuota(concepto: conceptoCuota) {
 ////   return this.http.post<conceptoCuota>(
////      "https://byg-gym.herokuapp.com/api/fee/concept",//
////      concepto
////    );
////  }

//  traerConceptoCuota(nombre: string) {
//    return this.http.get<conceptoCuota[]>(
//      "https://byg-gym.herokuapp.com/api/fee/concept?nombre=" + nombre
//    );
//  }

//  modificarConceptoCuota(concept: conceptoCuota) {
 //   return this.http.put<conceptoCuota>(
 //     "https://byg-gym.herokuapp.com/api/fee/concept",
 //     concept
  //  );
 // }

 // eliminarConceptoCuota(id: string) {
 //  return this.http.delete<string>(
 //     "https://byg-gym.herokuapp.com/api/fee/concept/" + id
 //   );
 // }
  //========================================Conecepto Cuota ========================================================//

  //======================================== Cuota ========================================================//

  crearCuota(cuota: cuotaDto) {
    return this.http.post<cuotaDto>(
      "http://localhost/php_api_gym/api_Pagos/postPago.php",
     {data:cuota} 
    );
  }

  getCuotasDelDia() {
    return this.http.get<cuotaDto[]>("http://localhost/php_api_gym/api_Pagos/getPagosPorDia.php");
  }

  deleteCuota(id: string) {
    const param = new HttpParams()
    .set('id', id.toString());
    return this.http.delete<string>(
      "http://localhost/php_api_gym/api_Pagos/deletePago.php" , { params: param }
    );
  }

  buscarCuotasCliente(dni: string , anio : string) {
    const param = new HttpParams()
    .set('dni', dni.toString());
    return this.http.get<cuotaDto[]>(
      "http://localhost/php_api_gym/api_Pagos/getPagosPorCliente.php?" ,  { params: param }
    );
  }

  traerIngresosPorMes(anio) {
    const param = new HttpParams()
    .set('anio', anio.toString());
   return this.http.get<[]>(
      "http://localhost/php_api_gym/api_Pagos/GetIngresosPorMes.php"  ,  { params: param }
   );
  }

  
  traerAccesosPorMes() {
    return this.http.get<[]>(
      "https://byg-gym.herokuapp.com/api/numbers/registry"
     );
   }
}
