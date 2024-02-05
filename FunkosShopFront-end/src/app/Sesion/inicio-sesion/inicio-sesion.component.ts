import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  usuario: Usuario = new Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  async iniciarSesion() {

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    const request$ = await this.http.post<string>("https://localhost:7281/api/Usuarios/login", JSON.stringify(this.usuario), options);
    let JWTID = await lastValueFrom(request$);
    if (JWTID != null) {
      let id = JWTID.toString().split(';')[1];
      let jsonWebToken = JWTID.toString().split(';')[0];
      localStorage.setItem('JsonWebToken', jsonWebToken);
      localStorage.setItem('usuarioId', id);
      this.router.navigate(['/'])

    }

  }

}