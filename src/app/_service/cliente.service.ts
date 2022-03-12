import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_model/Cliente';
import { Conductor } from '../_model/Conductor';
import { Destino } from '../_model/Destino';
import { Notificacion } from '../_model/Notificacion';
import { Pago } from '../_model/Pago';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL: string = environment.API + '/cliente';
  //private URL2: string = environment.UBER_MOTOS + '/reportes';

  constructor(private http: HttpClient) { }

  postRegistro(cliente: Cliente) {
    return this.http.post<Cliente>(this.URL + "/registroCliente", cliente);
  }

  postLogin(cliente: Cliente) {
    return this.http.post<Cliente>(this.URL + "/loginCliente", cliente);
  }

  //Solicitud Servicio
  getConductoresDisponibles(){
    return this.http.get<Conductor[]>(this.URL + "/conductoresDisponibles");
  }

  getDestino(){
    return this.http.get<Destino[]>(this.URL+"/destinos");
  }

  getUbicacion(){
    return this.http.get<Destino[]>(this.URL+"/ubicaciones");
  }

  getPago(){
    return this.http.get<Pago[]>(this.URL+"/metodoPago");
  }

  postCalcular(tarifa:any){
    return this.http.post<Notificacion>(this.URL+"/tarifas",tarifa);
  }

  postSolicitarServicio(notificacion: any){
    return this.http.post(this.URL + "/solicitudServicio", notificacion);
  }

  /*getFactura(usuario: string){
    return this.http.get(this.URL2 + "/facturaCliente?usuario=" + usuario);
  }*/
  //
}