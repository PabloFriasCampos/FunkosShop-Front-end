import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('usuarioID');
    if (id) {
      await this.obtenerUsuario(+id)

    }

  }

  async obtenerUsuario(id: number) {
    this.usuario = await this.api.obtenerUsuarioAdmin(id);

  }

}
