import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { lastValueFrom } from 'rxjs';
import { APIService } from 'src/app/Services/api.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  rutaAPI: string = "https://localhost:7281/api/Admin"
  id: any;
  usuario: Usuario = new Usuario;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService, private http: HttpClient, private ngxToastService: NgxToastService) { }

  async ngOnInit(): Promise<void> {
    this.id = await this.activatedRoute.snapshot.paramMap.get('usuarioID');
    if (this.id) {
      this.usuario = await this.api.obtenerUsuarioAdmin(+this.id);
    }

  }

  async modificaUserRol(id: number){
    const headers = this.api.getRequestHeaders();
    const request$ = this.http.put(`${this.rutaAPI}` + "/modifyUserRole/" +  this.id, JSON.stringify(this.usuario.rol), {headers})
    await lastValueFrom(request$)
    this.ngxToastService.onInfo('Los datos del usuario han sido modificados','')
  }

}
