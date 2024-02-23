import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto = new Producto();
  imageUrl: string = '';
  cantidad: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private totalCarrito: TotalCarritoService, private api: APIService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('productoID');
    if (id) {
      this.imageUrl = this.api.urlFoto(+id);
      await this.cargarProducto(+id);

    }
  }

  async cargarProducto(id: number) {
    this.producto = await this.api.cargarProducto(id);

  }

  async agregar() {
    await this.api.agregar(this.producto, this.cantidad);
    this.totalCarrito.cambiarTotal();

  }

  actualizarCantidad(actualizador: number) {
    this.cantidad += actualizador;
    if (this.cantidad < 1) {
      this.cantidad = 1;

    }

  }

}