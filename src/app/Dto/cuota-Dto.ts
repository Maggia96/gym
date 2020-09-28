
export class cuotaDto
{
   
    id : string;
    observacion:string;
    dniCliente: string;
    fechaPago : Date;
    Vencimiento: Date; 
    precio:number;
    Anulada:number;
 
    
constructor() {
    this.observacion = "";
    this.dniCliente = "";
    this.fechaPago = null;
    this.Vencimiento = null;
   
    this.precio = 0;
    this.Anulada = 0;
}
}