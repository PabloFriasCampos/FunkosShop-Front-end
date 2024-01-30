import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  usuario: Usuario = new Usuario;
  contrasena: string = '';

  constructor(private http: HttpClient) { }

  async registrarUsuario() {
    const headers = { 'Content-Type': `application/json` };

    if (this.contrasena == this.usuario.Contrasena) {
      let request$ = await this.http.post("https://localhost:7281/Usuario", JSON.stringify(this.usuario), { headers });
      await lastValueFrom(request$);

    } else {
      alert("Las contraseñas deben ser iguales");

    }
  }

}