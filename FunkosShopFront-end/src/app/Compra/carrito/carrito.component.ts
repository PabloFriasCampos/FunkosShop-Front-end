import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Carrito } from 'src/app/model/carrito';
import { ProductoCarrito } from 'src/app/model/producto-carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Carrito = new Carrito;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.cargarCarrito();

  }

  async cargarCarrito() {
    const request$ = await this.http.get("https://localhost:7281/api/Carritos/" + localStorage.getItem('usuarioID'));
    const resultado = await lastValueFrom(request$);
    this.carrito = resultado as Carrito;
  }

  async actualizarCantidad(actualizador: number, productoCarrito: ProductoCarrito) {
    productoCarrito.cantidadProducto += actualizador;
    if (productoCarrito.cantidadProducto < 0) {
      productoCarrito.cantidadProducto = 0;
      actualizador = 0;

    }
    await this.agregar(actualizador, productoCarrito);

  }

  async agregar(cantidad: number, productoCarrito: ProductoCarrito) {
    const headers = { 'Content-Type': 'application/json' };
    let idCarrito = localStorage.getItem('usuarioID');
    const request$ = await this.http.post("https://localhost:7281/api/ProductosCarrito/" + productoCarrito.producto.productoID + "/" + idCarrito + "/" + cantidad, { headers });
    await lastValueFrom(request$);

  }

}