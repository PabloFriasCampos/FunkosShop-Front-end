import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: Producto[] = []

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos()

  }

  async obtenerProductos() {
    const request$ = await this.http.get("https://localhost:7281/api/Productos");
    const productos = await lastValueFrom(request$);
    this.productos = productos as Producto[];

  }

}
