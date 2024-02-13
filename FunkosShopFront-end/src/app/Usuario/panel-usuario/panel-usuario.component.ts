import { Component } from '@angular/core';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent {

  constructor(private totalCarrito: TotalCarritoService) { }

  logOut() {
    sessionStorage.removeItem('usuarioID');
    localStorage.removeItem('usuarioID');
    sessionStorage.removeItem('JsonWebToken');
    localStorage.removeItem('JsonWebToken');
    this.totalCarrito.cambiarTotal();

  }

}
