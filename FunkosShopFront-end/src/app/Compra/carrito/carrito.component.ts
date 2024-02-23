import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Carrito } from 'src/app/model/carrito';
import { ProductoCarrito } from 'src/app/model/producto-carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Carrito = new Carrito;

  constructor(private totalCarrito: TotalCarritoService, private api: APIService) { }

  async ngOnInit(): Promise<void> {
    this.carrito = await this.api.cargarCarrito();
  }

  async actualizarCantidad(actualizador: number, productoCarrito: ProductoCarrito) {
    productoCarrito.cantidadProducto += actualizador;
    if (productoCarrito.cantidadProducto < 0) {
      productoCarrito.cantidadProducto = 0;
      actualizador = 0;

    }
    await this.api.agregar(productoCarrito.producto, actualizador);
    this.carrito = await this.api.cargarCarrito();

    this.actualizarTotal();
    this.totalCarrito.cambiarTotal();

  }

  eliminarProducto(producto: ProductoCarrito) {
    this.actualizarCantidad(-producto.cantidadProducto, producto)

  }

  actualizarTotal() {
    this.carrito.totalCarritoEUR = 0;
    for (let producto of this.carrito.listaProductosCarrito) {
      this.carrito.totalCarritoEUR += producto.totalProductoEUR;
    }
    console.log(this.carrito.totalCarritoEUR)

  }

}