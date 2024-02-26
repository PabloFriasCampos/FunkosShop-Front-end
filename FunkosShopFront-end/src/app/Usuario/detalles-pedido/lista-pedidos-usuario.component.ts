import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { Pedido } from 'src/app/model/pedido';

@Component({
  selector: 'app-lista-pedidos-usuario',
  templateUrl: './lista-pedidos-usuario.component.html',
  styleUrls: ['./lista-pedidos-usuario.component.css']
})
export class ListaPedidosUsuarioComponent implements OnInit {

  pedido: Pedido = new Pedido;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('pedidoID');
    if (id) {
      this.pedido = await this.api.obtenerPedido(+id);
    }

  }

  urlImage(id: number): string {
    return this.api.urlFoto(id);
  }

}
