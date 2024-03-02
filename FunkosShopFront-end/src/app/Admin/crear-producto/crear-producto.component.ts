import { Component } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { Producto } from 'src/app/model/producto';
import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  constructor(private api: APIService, private ngxToastService: NgxToastService) { }

  producto: Producto = new Producto;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  crearProducto() {
    this.api.crearProducto(this.producto, this.selectedFile!);
    this.ngxToastService.onInfo('Producto creado correctamente','El producto ya se muestra en la página web')
  }

}
