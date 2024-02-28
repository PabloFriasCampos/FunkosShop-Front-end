import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../model/carrito';
import { APIService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TotalCarritoService {
  rutaAPI: string = 'https://localhost:7281/api/';
  private totalItemsCarrito = new BehaviorSubject(0);
  totalActual = this.totalItemsCarrito.asObservable();

  constructor(private authService: AuthService, private http: HttpClient, private api: APIService) { }

  actualizarTotal(actualizador: number) {
    this.totalItemsCarrito.next(actualizador);

  }

  async cambiarTotal() {
    let actualizador = 0;
    const headers = this.api.getRequestHeaders()
    if (this.authService.isLogged() && sessionStorage.getItem('carrito') == null) {
      let idCarrito;
      if (sessionStorage.getItem('usuarioID')) idCarrito = sessionStorage.getItem('usuarioID');
      if (localStorage.getItem('usuarioID')) idCarrito = localStorage.getItem('usuarioID');
      const request$ = await this.http.get(`${this.rutaAPI}Carritos/total/` + idCarrito, { headers });
      actualizador = await lastValueFrom(request$) as number;

    } else {
      actualizador = this.totalCarritoLocal();

    }
    this.actualizarTotal(actualizador);

  }

  totalCarritoLocal(): number {
    let total = 0;
    if (sessionStorage.getItem('carrito') != null) {
      let carrito: Carrito = JSON.parse(sessionStorage.getItem('carrito')!) as Carrito;
      for (let producto of carrito.listaProductosCarrito) {
        total += producto.cantidadProducto;

      }
    }

    return total;

  }

}
