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

  opcionSeleccionada: String = 'sinFiltro'

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();


  }

  async obtenerProductos() {
    const request$ = await this.http.get("https://localhost:7281/api/Productos");
    const productos = await lastValueFrom(request$);
    this.productosCategoria = productos as CategoriaProductos[];
    this.funkoBuscador = this.productosCategoria;

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
      this.productosCategoria = this.funkoBuscador;
    }

    // Filtra las categorías de productos
    this.productosCategoria = this.funkoBuscador.map(categoria => {
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

  cambiarFiltro() {
    switch(this.opcionSeleccionada){
      case "sinFiltro":
        // Que no tenga ningun filtro puesto
        this.productosCategoria = this.funkoBuscador;
        break;

      case "MenorPrecio":
        // Ordenar los productos por el precio de menor a mayor
        this.productosCategoria = this.productosCategoria.map(categoria => ({
          categoria: categoria.categoria, 
          productos: categoria.productos.slice().sort((a, b) => a.precioEUR - b.precioEUR)
        }));
        break;

      case "MayorPrecio":
        // Ordenar los productos por precio de mayor a menor
        this.productosCategoria = this.productosCategoria.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.slice().sort((a, b) => b.precioEUR - a.precioEUR)
        }));
        break;

      case "LetraA_Z":
        // Ordenar los productos por el nombre de la A a la Z
        this.productosCategoria = this.productosCategoria.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.slice().sort((a, b) => a.nombreProducto.localeCompare(b.nombreProducto))
        }));
        break;

      case "LetraZ_A":
        // Ordenar los productos por el nombre de la Z a la A
        this.productosCategoria = this.productosCategoria.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.slice().sort((a, b) => b.nombreProducto.localeCompare(a.nombreProducto))
        }));
        break;
      }
  }
}
