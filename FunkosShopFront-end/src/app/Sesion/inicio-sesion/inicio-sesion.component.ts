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
    let jsonWebToken = await lastValueFrom(request$);
    if (jsonWebToken != null) {
      localStorage.setItem('JsonWebToken', jsonWebToken.toString());
      this.router.navigate(['/'])

    }

  }

}