import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private api: APIService) { }

  async ngOnInit(): Promise<void> {
    this.usuarios = await this.api.obtenerTodosUsuarios() as Usuario[];

  }

}
