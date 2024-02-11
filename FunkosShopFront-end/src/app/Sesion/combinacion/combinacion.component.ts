import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-combinacion',
  templateUrl: './combinacion.component.html',
  styleUrls: ['./combinacion.component.css']
})
export class CombinacionComponent {
  readonly PARAM_KEY: string = 'redirectTo';
  private redirectTo: string | null = null;

  usuarioLogIn: Usuario = new Usuario;
  usuarioSignUp: Usuario = new Usuario;
  repetirContrasena: string = '';
  toggle: boolean = false;
  recuerdame: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute,) {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;

    if (queryParams.has(this.PARAM_KEY)) {
      this.redirectTo = queryParams.get(this.PARAM_KEY);
    }
  }

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
      if (this.recuerdame) {
        localStorage.setItem('JsonWebToken', jsonWebToken);
        localStorage.setItem('usuarioID', id);

      } else {
        sessionStorage.setItem('JsonWebToken', jsonWebToken);
        sessionStorage.setItem('usuarioID', id);

      }

      if (this.redirectTo != null) {
        this.router.navigateByUrl(this.redirectTo);
      } else {
        this.router.navigateByUrl('');

      }

    }

  }

}
