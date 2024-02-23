import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Carrito } from '../model/carrito';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { ProductoCarrito } from '../model/producto-carrito';
import { Transaccion } from '../model/transaccion';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  rutaAPI: string = 'https://localhost:7281/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ------------------------------ Peticiones Usuario ------------------------------

  async obtenerUsuario(): Promise<Usuario> {
    let usuarioID = this.getUsuarioID;
    const request$ = await this.http.get(`${this.rutaAPI}Usuarios/` + usuarioID);
    const resultado = await lastValueFrom(request$);
    return resultado as Usuario;

  }

  async registrarUsuario(usuarioSignUp: Usuario) {
    const options = this.getRequestOptions();
    let request$ = await this.http.post(`${this.rutaAPI}Usuarios/signup`, JSON.stringify(usuarioSignUp), options);
    await lastValueFrom(request$);
  }

  async iniciarSesion(usuarioLogIn: Usuario, recuerdame: boolean): Promise<boolean> {
    const options = this.getRequestOptions();
    let JWTID;
    let loggeado: boolean = false;

    const request$ = await this.http.post<string>(`${this.rutaAPI}Usuarios/login`, JSON.stringify(usuarioLogIn), options);
    JWTID = await lastValueFrom(request$)

    if (JWTID != null) {
      let id = JWTID.toString().split(';')[1];
      let jsonWebToken = JWTID.toString().split(';')[0];
      if (recuerdame) {
        localStorage.setItem('JsonWebToken', jsonWebToken);
        localStorage.setItem('usuarioID', id);

      } else {
        sessionStorage.setItem('JsonWebToken', jsonWebToken);
        sessionStorage.setItem('usuarioID', id);
      }
      loggeado = true;
    }

    return loggeado;
  }

  // ------------------------------ Peticiones Carrito ------------------------------

  async cargarCarrito(): Promise<Carrito> {
    if (this.authService.isLogged() && (sessionStorage.getItem('carrito') == null)) {
      return this.cargarCarritoBBDD();

    } else {
      return this.cargarCarritoLocal();

    }

  }

  async cargarCarritoBBDD(): Promise<Carrito> {
    let usuarioID = this.getUsuarioID();
    const request$ = await this.http.get(`${this.rutaAPI}Carritos/` + usuarioID);
    const resultado = await lastValueFrom(request$);
    return resultado as Carrito;
  }

  async cargarCarritoLocal(): Promise<Carrito> {
    let carrito: Carrito = JSON.parse(sessionStorage.getItem('carrito')!) as Carrito;
    for (let producto of carrito.listaProductosCarrito) {
      carrito.totalCarritoEUR += producto.totalProductoEUR;

    }

    return carrito;

  }

  // ------------------------------ Peticiones Compra ------------------------------

  async obtenerETH(): Promise<number> {
    const request$ = await this.http.get(`${this.rutaAPI}PedidoCripto/ETH`);
    return await lastValueFrom(request$) as number;

  }

  async comprarProductos(productos: ProductoCarrito[], cuentaMetaMask: string): Promise<Transaccion> {
    let usuarioID = this.getUsuarioID();
    const headers = this.getRequestHeaders();
    const body = {
      productos: productos,
      cuentaMetaMask: cuentaMetaMask,
      id: usuarioID
    };
    const request$ = await this.http.post(`${this.rutaAPI}PedidoCripto/buy`, JSON.stringify(body), { headers });
    return await lastValueFrom(request$) as Transaccion;

  }

  async checkCompra(idTransaccion: number, txHash: string): Promise<boolean> {
    let usuarioID = this.getUsuarioID();
    let carritoLocal = false;
    if (sessionStorage.getItem('carrito')) {
      carritoLocal = true;
    }
    const body = {
      txHash: txHash,
      id: usuarioID,
      carritoLocal: carritoLocal
    };
    const headers = this.getRequestHeaders();
    const request$ = await this.http.post(`${this.rutaAPI}PedidoCripto/check/${idTransaccion}`, JSON.stringify(body), { headers });
    return await lastValueFrom(request$) as boolean;

  }

  // ------------------------------ Funciones internas ------------------------------

  private getUsuarioID(): string {
    return sessionStorage.getItem('usuarioID') || localStorage.getItem('usuarioID') || '';
  }

  private getRequestHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private getRequestOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
  }

}
