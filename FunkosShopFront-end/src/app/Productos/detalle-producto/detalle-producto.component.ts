import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Carrito } from 'src/app/model/carrito';
import { Producto } from 'src/app/model/producto';
import { ProductoCarrito } from 'src/app/model/producto-carrito';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto = new Producto();
  imageUrl: string = '';
  cantidad: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private authService: AuthService, private totalCarrito: TotalCarritoService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('productoID');
    this.imageUrl = 'https://localhost:7281/images/' + id + '.png';
    if (id) {
      await this.cargarProducto(+id);

    }
  }

  async cargarProducto(id: number) {
    const request$ = await this.http.get("https://localhost:7281/api/Productos/" + id);
    this.producto = await lastValueFrom(request$) as Producto;

  }

  async agregar() {
    if (this.authService.isLogged() && sessionStorage.getItem('carrito') == null) {
      await this.agregarBBDD()

    } else {
      await this.agregarLocal()

    }
    this.totalCarrito.cambiarTotal();

  }

  async agregarBBDD() {
    const headers = { 'Content-Type': 'application/json' };
    let idCarrito;
    if (sessionStorage.getItem('usuarioID')) idCarrito = sessionStorage.getItem('usuarioID');
    if (localStorage.getItem('usuarioID')) idCarrito = localStorage.getItem('usuarioID');
    const request$ = await this.http.post("https://localhost:7281/api/ProductosCarrito/" + this.producto.productoID + "/" + idCarrito + "/" + this.cantidad, { headers });
    await lastValueFrom(request$);

  }

  agregarLocal() {
    if (sessionStorage.getItem('carrito')) {
      let carrito: Carrito = JSON.parse(sessionStorage.getItem('carrito')!) as Carrito;
      let yaEsta = false;
      for (let productoCarrito of carrito.listaProductosCarrito) {
        if (productoCarrito.producto.productoID == this.producto.productoID) {
          yaEsta = true;
          productoCarrito.cantidadProducto += this.cantidad;
          productoCarrito.totalProductoEUR = +(productoCarrito.producto.precioEUR * productoCarrito.cantidadProducto).toFixed(2);

        }

      }

      if (!yaEsta) {
        let productoCarrito = new ProductoCarrito;

        productoCarrito.cantidadProducto = this.cantidad;
        productoCarrito.producto = this.producto;
        productoCarrito.totalProductoEUR = +(productoCarrito.producto.precioEUR * productoCarrito.cantidadProducto).toFixed(2);

        carrito.listaProductosCarrito.push(productoCarrito);

      }

      sessionStorage.setItem('carrito', JSON.stringify(carrito));


    } else {
      let carrito = new Carrito;
      let productoCarrito = new ProductoCarrito;

      productoCarrito.cantidadProducto = this.cantidad;
      productoCarrito.producto = this.producto;
      productoCarrito.totalProductoEUR = +(productoCarrito.producto.precioEUR * productoCarrito.cantidadProducto).toFixed(2);

      carrito.listaProductosCarrito.push(productoCarrito);

      sessionStorage.setItem('carrito', JSON.stringify(carrito));

    }

  }

  actualizarCantidad(actualizador: number) {
    this.cantidad += actualizador;
    if (this.cantidad < 1) {
      this.cantidad = 1;

    }

  }

}