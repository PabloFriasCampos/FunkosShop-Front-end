import { HttpClient } from '@angular/common/http';
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
    const headers = { 'Content-Type': `application/json` };

    let request$ = await this.http.post("https://localhost:7281/api/Usuarios/login", JSON.stringify(this.usuario), { headers });
    const correcto = await lastValueFrom(request$);

    if (correcto === true) {
      this.router.navigate([''])
      alert("Inicio de sesión correcto")
    } else {
      alert("Usuario o contraseña erróneos");
    }

  }

}
