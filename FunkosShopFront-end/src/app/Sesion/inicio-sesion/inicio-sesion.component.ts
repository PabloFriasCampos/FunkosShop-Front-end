import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    this.http.post("https://localhost:7281/api/Usuarios/login", JSON.stringify(this.usuario), options)
      .subscribe((data: any) => {
        if (data != null) {
          this.router.navigate([''])
          sessionStorage.setItem('jsonWebToken', data)
          alert("Inicio de sesión correcto")
        }

      });

  }

}