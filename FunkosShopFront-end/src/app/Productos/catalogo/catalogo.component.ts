import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
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

  opcionSeleccionada: String = 'sinFiltro' // Filtro por defecto
  sinFiltro = true

  constructor(private api: APIService) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerProductos();

  }

  async obtenerProductos() {
    this.todosFunkos = await this.api.obtenerProductos();
    this.funkosFiltrados = this.todosFunkos;

  }

  urlImage(id: number): string {
    return this.api.urlFoto(id);
  }

  aplicarFiltros() {
    this.cambiarFiltro();
    this.buscarFunko();

  }

  buscarFunko() {
    const nombreBuscado = this.buscadorFunko.toLowerCase();
    this.busquedaActual = nombreBuscado; // Almacena la busqueda
    this.aplicarBusqueda();
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
      case "sinFiltro":
        if (this.sinFiltro == false) {
          this.obtenerProductos();
          this.sinFiltro = true;
        }
        break;

      case "MenorPrecio":
        // Ordenar los productos por el precio de menor a mayor
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => a.precioEUR - b.precioEUR)
        }));
        this.sinFiltro = false;
        break;

      case "MayorPrecio":
        // Ordenar los productos por precio de mayor a menor
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => b.precioEUR - a.precioEUR)
        }));
        this.sinFiltro = false;
        break;

      case "LetraA_Z":
        // Ordenar los productos por el nombre de la A a la Z
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => a.nombreProducto.localeCompare(b.nombreProducto))
        }));
        this.sinFiltro = false;
        break;

      case "LetraZ_A":
        // Ordenar los productos por el nombre de la Z a la A
        this.funkosFiltrados = this.todosFunkos.map(categoria => ({
          categoria: categoria.categoria,
          productos: categoria.productos.sort((a, b) => b.nombreProducto.localeCompare(a.nombreProducto))
        }));
        this.sinFiltro = false;
        break;
    }
  }
}
