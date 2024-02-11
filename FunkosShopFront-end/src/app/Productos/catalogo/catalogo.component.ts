import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoriaProductos } from 'src/app/model/categoria-productos';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  funkosFiltrados: CategoriaProductos[] = []

  todosFunkos: CategoriaProductos[] = []
  buscadorFunko: String = ''
  busquedaActual: String = ''

  opcionSeleccionada: String = 'MenorPrecio'

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();


  }

  async obtenerProductos() {
    const request$ = await this.http.get("https://localhost:7281/api/Productos");
    const productos = await lastValueFrom(request$);
    this.todosFunkos = productos as CategoriaProductos[];
    this.funkosFiltrados = this.todosFunkos;

  }

  buscarFunko() {
    const nombreBuscado = this.buscadorFunko.toLowerCase();
    this.busquedaActual = nombreBuscado; // Almacena la busqueda
    this.aplicarBusqueda();
  }

  aplicarFiltros() {
    this.cambiarFiltro();
    this.buscarFunko();

  }

  aplicarBusqueda() {
    // Filtra por el nombre buscado
    const nombreBuscado = this.busquedaActual.toLowerCase();

    // Filtra las categorías de productos
    this.funkosFiltrados = this.todosFunkos.map(categoria => {
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
    switch (this.opcionSeleccionada) {
      case "MenorPrecio":
        // Ordenar los productos por el precio de menor a mayor
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => a.precioEUR - b.precioEUR)
        }));
        break;

      case "MayorPrecio":
        // Ordenar los productos por precio de mayor a menor
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => b.precioEUR - a.precioEUR)
        }));
        break;

      case "LetraA_Z":
        // Ordenar los productos por el nombre de la A a la Z
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => a.nombreProducto.localeCompare(b.nombreProducto))
        }));
        break;

      case "LetraZ_A":
        // Ordenar los productos por el nombre de la Z a la A
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => b.nombreProducto.localeCompare(a.nombreProducto))
        }));
        break;
    }
  }
}
