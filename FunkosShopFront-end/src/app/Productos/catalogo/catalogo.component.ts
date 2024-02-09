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

  funkoBuscador: CategoriaProductos[] = []
  buscadorFunko: String = ''
  busquedaActual: String = ''

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();
    

  }

  async obtenerProductos() {
    const request$ = await this.http.get("https://localhost:7281/api/Productos");
    const productos = await lastValueFrom(request$);
    this.productosCategoria = productos as CategoriaProductos[];
    
  }

  buscarFunko() {
    const nombreBuscado = this.buscadorFunko.toLowerCase();
    this.busquedaActual = nombreBuscado; // Almacena la busqueda
    this.aplicarBusqueda();
  }

  aplicarBusqueda() {
    // Filtra por el nombre buscado
    const nombreBuscado = this.busquedaActual.toLowerCase();
  
    // Si el buscador está vacio entonces muestra todos los productos
    if (nombreBuscado == '') {
      this.obtenerProductos();
    }
  
    // Filtra las categorías de productos
    this.productosCategoria = this.productosCategoria.map(categoria => {
      const productosFiltrados = categoria.productos.filter(producto =>
        producto.nombreProducto.toLowerCase().includes(nombreBuscado)
      );
  
      // Devuelve el producto buscado
      return {
        categoria: categoria.categoria,
        productos: productosFiltrados
      };
    });
  }
}
