import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  /* constructor(private http: HttpClient) { }

  async login() {
    let usuario = new Usuario("Pablo")
    await this.http.post("https://localhost:7281/Usuario", JSON.parse(JSON.stringify(usuario)))
  } */

}
