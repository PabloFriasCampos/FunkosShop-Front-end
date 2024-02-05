import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CategoriaProductos } from 'src/app/model/categoria-productos';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productosCategoria: CategoriaProductos[] = []

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();


  }

  async obtenerProductos() {
    const request$ = await this.http.get("https://localhost:7281/api/Productos");
    const productos = await lastValueFrom(request$);
    this.productosCategoria = productos as CategoriaProductos[];

  }

}
