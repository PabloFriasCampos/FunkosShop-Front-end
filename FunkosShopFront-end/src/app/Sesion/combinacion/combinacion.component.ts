import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, firstValueFrom, lastValueFrom } from 'rxjs';
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
    let httpStatus;
    const headers = { 'Content-Type': 'application/json' };

    if (this.repetirContrasena == this.usuarioSignUp.contrasena) {
      let request$ = await this.http.post("https://localhost:7281/api/Usuarios/signup", JSON.stringify(this.usuarioSignUp), { headers });
      await lastValueFrom(request$).catch(err => httpStatus = err.status)
      alert(httpStatus)
      this.toggle = false;

    } else {
      alert("Las contraseñas deben ser iguales");

    }
  }

  async iniciarSesion() {

    if (this.usuarioLogIn.correo.length == 0 || this.usuarioLogIn.contrasena.length == 0) {

      alert("Introduce correo y contraseña");

    } else {

      const options: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'text'
      };

      let JWTID;
      let errorUserPass = "El usuario o contraseña incorrecta";
      let httpStatus;
      try {
        const request$ = await this.http
          .post<string>("https://localhost:7281/api/Usuarios/login", JSON.stringify(this.usuarioLogIn), options)

        JWTID = await lastValueFrom(request$)
        
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
      } catch (error) {
        alert("Error del catch: Usuario o contraseña incorrecto")
      }
    }
  }


  colorVentanas() {

    this.usuarioLogIn.nombreUsuario
    if (!this.toggle) {
      let iniciar = document.getElementById('iniciar')!
      let registrar = document.getElementById('registrar')!

      iniciar.style.background = '#e7e7e7'
      iniciar.style.color = '#333'
      registrar.style.color = '#e7e7e7'
      registrar.style.backgroundColor = '#333'

    } else {
      let iniciar = document.getElementById('iniciar')!
      let registrar = document.getElementById('registrar')!

      registrar.style.background = '#e7e7e7'
      registrar.style.color = '#333'
      iniciar.style.color = '#e7e7e7'
      iniciar.style.backgroundColor = '#333'

    }

  }

}
