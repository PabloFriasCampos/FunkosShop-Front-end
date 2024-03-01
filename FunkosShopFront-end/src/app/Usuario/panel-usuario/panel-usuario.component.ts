import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Pedido } from 'src/app/model/pedido';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private api: APIService, private totalCarrito: TotalCarritoService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.pedidos = await this.api.obtenerPedidosUsuario();

  }

  logOut() {
    sessionStorage.removeItem('usuarioID');
    localStorage.removeItem('usuarioID');
    sessionStorage.removeItem('JsonWebToken');
    localStorage.removeItem('JsonWebToken');
    this.totalCarrito.cambiarTotal();
    this.router.navigate([''])
  }

}
