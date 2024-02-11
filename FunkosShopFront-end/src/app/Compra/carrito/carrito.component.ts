import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { Carrito } from 'src/app/model/carrito';
import { ProductoCarrito } from 'src/app/model/producto-carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Carrito = new Carrito;

  constructor(private http: HttpClient, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    if (this.authService.isLogged() && !(sessionStorage.getItem('carrito') != null)) {
      await this.cargarCarritoBBDD();

    } else {
      await this.cargarCarritoLocal();

    }
  }

  async cargarCarritoBBDD() {
    let usuarioID;
    if (sessionStorage.getItem('usuarioID')) usuarioID = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) usuarioID = localStorage.getItem('usuarioID');
    const request$ = await this.http.get("https://localhost:7281/api/Carritos/" + usuarioID);
    const resultado = await lastValueFrom(request$);
    this.carrito = resultado as Carrito;
  }

  async cargarCarritoLocal() {
    if (sessionStorage.getItem('carrito')) {
      this.carrito = JSON.parse(sessionStorage.getItem('carrito')!) as Carrito;

    }

  }

  async actualizarCantidad(actualizador: number, productoCarrito: ProductoCarrito) {
    productoCarrito.cantidadProducto += actualizador;
    if (productoCarrito.cantidadProducto < 0) {
      productoCarrito.cantidadProducto = 0;
      actualizador = 0;

    }
    if (this.authService.isLogged()) {
      await this.agregarBBDD(actualizador, productoCarrito);

    } else {
      await this.agregarLocal(productoCarrito);

    }

    this.actualizarTotales(productoCarrito);

  }

  async agregarBBDD(cantidad: number, productoCarrito: ProductoCarrito) {
    const headers = { 'Content-Type': 'application/json' };
    let idCarrito;
    if (sessionStorage.getItem('usuarioID')) idCarrito = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) idCarrito = localStorage.getItem('usuarioID');
    const request$ = await this.http.post("https://localhost:7281/api/ProductosCarrito/" + productoCarrito.producto.productoID + "/" + idCarrito + "/" + cantidad, { headers });
    await lastValueFrom(request$);

  }

  async agregarLocal(productoCarrito: ProductoCarrito) {

    if (productoCarrito.cantidadProducto == 0) {
      let index = this.carrito.listaProductosCarrito.indexOf(productoCarrito);
      this.carrito.listaProductosCarrito.splice(index, 1);

    } else {

    }

    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));

  }

  eliminarProducto(producto: ProductoCarrito) {
    this.actualizarCantidad(-producto.cantidadProducto, producto)

  }

  borrarCarrito() {
    sessionStorage.removeItem('carrito');

  }

  actualizarTotales(productoCarrito: ProductoCarrito) {

    for (let producto of this.carrito.listaProductosCarrito) {
      if (producto.producto.productoID == productoCarrito.producto.productoID) {
        producto.cantidadProducto = productoCarrito.cantidadProducto;
        producto.totalProductoEUR = +(productoCarrito.producto.precioEUR * productoCarrito.cantidadProducto).toFixed(2);

      }

    }

    this.carrito.totalCarritoEUR = 0;
    for (let producto of this.carrito.listaProductosCarrito) {
      this.carrito.totalCarritoEUR += producto.totalProductoEUR;

    }

  }

}