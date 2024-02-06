import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('productoId');
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
    const headers = { 'Content-Type': 'application/json' };
    let idCarrito = localStorage.getItem('usuarioId');
    const request$ = await this.http.post("https://localhost:7281/api/ListaProductosCarrito/" + this.producto.productoId + "/" + idCarrito + "/" + this.cantidad, { headers });
    const resultado = await lastValueFrom(request$);

  }

  actualizarCantidad(actualizador: number) {
    this.cantidad += actualizador;
    if (this.cantidad < 1) {
      this.cantidad = 1;

    }

  }

}