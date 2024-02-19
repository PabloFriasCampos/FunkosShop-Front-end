import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Carrito } from '../model/carrito';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { ProductoCarrito } from '../model/producto-carrito';
import { Transaccion } from '../model/transaccion';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  rutaAPI: string = 'https://localhost:7281/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  async obtenerUsuario(): Promise<Usuario> {
    let usuarioID;
    if (sessionStorage.getItem('usuarioID')) usuarioID = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) usuarioID = localStorage.getItem('usuarioID');
    const request$ = await this.http.get(`${this.rutaAPI}Usuarios/` + usuarioID);
    const resultado = await lastValueFrom(request$);
    return resultado as Usuario;

  }

  async cargarCarrito(): Promise<Carrito> {
    if (this.authService.isLogged() && (sessionStorage.getItem('carrito') == null)) {
      return this.cargarCarritoBBDD();

    } else {
      return this.cargarCarritoLocal();

    }

  }

  async cargarCarritoBBDD(): Promise<Carrito> {
    let usuarioID;
    if (sessionStorage.getItem('usuarioID')) usuarioID = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) usuarioID = localStorage.getItem('usuarioID');
    const request$ = await this.http.get(`${this.rutaAPI}Carritos/` + usuarioID);
    const resultado = await lastValueFrom(request$);
    return resultado as Carrito;
  }

  async cargarCarritoLocal(): Promise<Carrito> {
    return JSON.parse(sessionStorage.getItem('carrito')!) as Carrito;

  }

  async comprarProductos(productos: ProductoCarrito[], cuentaMetaMask: string): Promise<Transaccion> {
    let usuarioID;
    if (sessionStorage.getItem('usuarioID')) usuarioID = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) usuarioID = localStorage.getItem('usuarioID');
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      productos: productos,
      cuentaMetaMask: cuentaMetaMask,
      id: usuarioID
    };
    const request$ = await this.http.post(`${this.rutaAPI}PedidoCripto/buy`, JSON.stringify(body), { headers });
    return await lastValueFrom(request$) as Transaccion;

  }

  async checkCompra(idTransaccion: number, txHash: string): Promise<boolean> {
    let usuarioID;
    if (sessionStorage.getItem('usuarioID')) usuarioID = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) usuarioID = localStorage.getItem('usuarioID');
    const body = {
      txHash: txHash,
      id: usuarioID
    };
    const headers = { 'Content-Type': 'application/json' };
    const request$ = await this.http.post(`${this.rutaAPI}PedidoCripto/check/${idTransaccion}`, JSON.stringify(body), { headers });
    return await lastValueFrom(request$) as boolean;

  }

}
