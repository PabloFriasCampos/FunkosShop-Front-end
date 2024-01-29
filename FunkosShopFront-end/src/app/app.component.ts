import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  async login() {
    let usuario = new Usuario
    usuario.NombreUsuario = "Pablo"
    await this.http.post("https://localhost:7281/Usuario", JSON.parse(JSON.stringify(usuario)))
      .subscribe(data => console.log(data))
  }

}