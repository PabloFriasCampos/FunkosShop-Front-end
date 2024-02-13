import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../model/carrito';

@Injectable({
  providedIn: 'root'
})
export class TotalCarritoService {

  private totalItemsCarrito = new BehaviorSubject(0);
  totalActual = this.totalItemsCarrito.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) { }

  actualizarTotal(actualizador: number) {
    this.totalItemsCarrito.next(actualizador);

  }

  async cambiarTotal() {
    let actualizador = 0;
    if (this.authService.isLogged() && sessionStorage.getItem('carrito') == null) {
      let idCarrito;
      if (sessionStorage.getItem('usuarioID')) idCarrito = sessionStorage.getItem('usuarioID');
      if (localStorage.getItem('usuarioID')) idCarrito = localStorage.getItem('usuarioID');
      const request$ = await this.http.get("https://localhost:7281/api/Carritos/total/" + idCarrito);
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
