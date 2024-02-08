import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.component.html',
  styleUrls: ['./combinacion.component.css']
})
export class CombinacionComponent {

  usuarioLogIn: Usuario = new Usuario;
  usuarioSignUp: Usuario = new Usuario;
  repetirContrasena: string = '';
  toggle: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  async registrarUsuario() {
    const headers = { 'Content-Type': 'application/json' };

    if (this.repetirContrasena == this.usuarioSignUp.contrasena) {
      let request$ = await this.http.post("https://localhost:7281/api/Usuarios/signup", JSON.stringify(this.usuarioSignUp), { headers });
      await lastValueFrom(request$);
      this.toggle = false;

    } else {
      alert("Las contraseñas deben ser iguales");

    }
  }

  async iniciarSesion() {

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    const request$ = await this.http.post<string>("https://localhost:7281/api/Usuarios/login", JSON.stringify(this.usuarioLogIn), options);
    let JWTID = await lastValueFrom(request$);
    if (JWTID != null) {
      let id = JWTID.toString().split(';')[1];
      let jsonWebToken = JWTID.toString().split(';')[0];
      localStorage.setItem('JsonWebToken', jsonWebToken);
      localStorage.setItem('usuarioID', id);
      this.router.navigate(['/'])

    }

  }

}
