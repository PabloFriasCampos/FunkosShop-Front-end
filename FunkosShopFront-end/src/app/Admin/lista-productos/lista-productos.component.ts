import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private api: APIService) { }

  async ngOnInit(): Promise<void> {
    this.productos = await this.api.obtenerTodosProductos();
  }

  urlImage(id: number) {
    return this.api.urlFoto(id)

  }

}
