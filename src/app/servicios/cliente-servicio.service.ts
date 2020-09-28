import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { clienteDto } from '../Dto/cliente.Dto';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {

 public clienteSeleccionado : clienteDto  = new clienteDto();
public clienteNuevo:boolean;
selectedfile : File;

  constructor(
    private Http : HttpClient, private toastr : ToastrService )
     {
       this.clienteNuevo = false;
     }
     
                postCliente(client : clienteDto){
                  return this.Http.post<clienteDto>
                  ("http://localhost/php_api_gym/api_Cliente/Postcliente.php", {data: client} )
                }
         

                onUpload(){
                  const UploadData = new FormData();
                  UploadData.append("myFile" , this.selectedfile , this.selectedfile.name);
                  console.log(UploadData);
                  this.Http.post("http://localhost/php_api_gym/api_Cliente/uploadCliente.php" , UploadData ).subscribe((data:any) => {
                    if(data.data.success){
                      this.toastr.success(data.data.mensaje);
                    }else{
                      this.toastr.error(data.data.mensaje);
                    }
                  });
                  }
            


                   getClientes(page : number){
                    const param = new HttpParams()
                    .set('page', page.toString());
                       return this.Http.get<clienteDto[]>
                       ("http://localhost/php_api_gym/api_Cliente/getClientes.php" , { params: param })
                   } 

                   getAllClientes(){
                   
                    return this.Http.get<clienteDto[]>
                    ("http://localhost/php_api_gym/api_Cliente/getAllClientes.php")
                } 
                   
                   getClientesActivos(){
                   
                       return this.Http.get<clienteDto[]>
                       ("http://localhost/php_api_gym/api_Cliente/getActivos.php")
                   } 
                   
                 eliminarCliente(dni : string){
                  const param = new HttpParams()
                  .set('dni', dni.toString());
                 return this.Http.delete('http://localhost/php_api_gym/api_Cliente/deleteCliente.php' , { params: param });
                } 


                 
                 editarCliente(cliente : clienteDto){
              
                    return this.Http.put<clienteDto>
                    ("http://localhost/php_api_gym/api_Cliente/putCliente.php" , {data:cliente})
                 
                 }

                 getClientePornombre(filtro : string){
                    const prueba = new clienteDto();
                    prueba.nombre = filtro;
                    return this.Http.post<clienteDto>
                    ("http://localhost/php_api_gym/api_Cliente/getByName.php" , {data : prueba})
                 };

                 getClientePorDni(filtro : string){
                  const prueba = new clienteDto();
                  prueba.nombre = filtro;
                  return this.Http.post<clienteDto>
                  ("http://localhost/php_api_gym/api_Cliente/getByDni.php" , {data : prueba})
               };

                 registrarIngreso(dni : string){
                   return this.Http.get<string>
                   ("https://byg-gym.herokuapp.com/api/client/access/" + dni)
                 }

                 getAccesos(id : string){
                 
                  return this.Http.get<string[]>
                   ("https://byg-gym.herokuapp.com/api/client/entry/"+id)
                 }
                 
                 Notificar(){
                  return this.Http.post<string>("https://api.whatsapp.com/send?phone=543815835566&text=hola" , 2)
                }

                clientesXVencer(dias:number){
                  return this.Http.get<clienteDto[]>
                  ("https://byg-gym.herokuapp.com/api/fee/pending?day="+ dias)
                
                }

                getClientesPorVencer(dias : number){
                  const param = new HttpParams()
                  .set('dias', dias.toString());
                     return this.Http.get<clienteDto[]>
                     ("http://localhost/php_api_gym/api_Cliente/notificarCliente.php" , { params: param })
                 } 

              
                 


                 
     }

