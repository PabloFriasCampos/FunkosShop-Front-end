import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { Pedido } from 'src/app/model/pedido';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private api: APIService) { }

  async ngOnInit(): Promise<void> {
    this.pedidos = await this.api.obtenerPedidosUsuario();

  }

}
