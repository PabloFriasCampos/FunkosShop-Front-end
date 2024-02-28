import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  producto: Producto = new Producto;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('productoID');
    if (id) {
      await this.obtenerProducto(+id)

    }

  }

  async obtenerProducto(id: number) {
    this.producto = await this.api.cargarProducto(id);

  }

  urlImage(id: number) {
    return this.api.urlFoto(id);

  }

  async modificaProducto(id: number){
    const headers = this.api.getRequestHeaders()
    const request$ = this.http.put(`${this.rutaAPI}` + "/modifyProduct/" +  this.producto.productoID, this.producto, { headers })
    await lastValueFrom(request$)
    
  }
}
