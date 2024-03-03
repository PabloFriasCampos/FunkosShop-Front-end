import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxToastService } from 'ngx-toast-notifier';
import { lastValueFrom } from 'rxjs';
import { APIService } from 'src/app/Services/api.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  rutaAPI: string = "https://localhost:7281/api/Admin"
  usuarios: Usuario[] = [];

  constructor(private api: APIService, private http: HttpClient,private ngxToastService: NgxToastService) { }

  async ngOnInit(): Promise<void> {
   this.obtenerUsuarios()

  }

  async obtenerUsuarios(){
    this.usuarios = await this.api.obtenerTodosUsuarios() as Usuario[];
  }
  async borrarUsuario(id: number){
      const headers = this.api.getRequestHeaders()
      const request$ = this.http.delete(`${this.rutaAPI}` + "/deleteUser/" + id, { headers })
      await lastValueFrom(request$)
      this.obtenerUsuarios()
      this.ngxToastService.onDanger('Se ha eliminado este usuario','')
  }

}
