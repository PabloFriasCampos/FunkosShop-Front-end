import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { lastValueFrom } from 'rxjs';
import { APIService } from 'src/app/Services/api.service';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-admin-producto',
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.css']
})
export class AdminProductoComponent implements OnInit {

  rutaAPI: string = 'https://localhost:7281/api/Admin';
  rutaImagen: string = '';
  producto: Producto = new Producto;
  selectedFile: File | null = null;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService, private http: HttpClient, private ngxToastService: NgxToastService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('productoID');
    if (id) {
      await this.obtenerProducto(+id);
      this.rutaImagen = await this.api.urlFoto(+id);
    }

  }

  async obtenerProducto(id: number) {
    this.producto = await this.api.cargarProducto(id);
  }

  async modificaProducto() {
    const headers = this.api.getRequestHeaders()
    if (this.producto.nombreProducto.trim().length == 0) {
      this.ngxToastService.onDanger('El nombre no puede estar vacío', '')
    } else if (this.producto.descripcion.trim().length == 0) {
      this.ngxToastService.onDanger('La descripción no puede estar vacía', '')
    } else if (this.producto.precioEUR.toString().trim().length == 0) {
      this.ngxToastService.onDanger('El precio no puede estar vacío', '')
    } else {
      this.producto.precioEUR = +this.producto.precioEUR.toString().replace(',', '.')
      const request$ = this.http.put(`${this.rutaAPI}` + "/modifyProduct/" + this.producto.productoID, this.producto, { headers })
      await lastValueFrom(request$);
      this.api.subirImagen(this.selectedFile!, this.producto.productoID.toString())
      this.ngxToastService.onInfo('Se ha modificado el producto con éxito', '')
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
}
