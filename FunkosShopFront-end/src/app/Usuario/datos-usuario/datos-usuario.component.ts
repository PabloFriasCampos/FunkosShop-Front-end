import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  cuentaUser: Usuario = new Usuario();
  nameUserToModify: string = "";
  correoUserToModify: string = "";
  passwordUserToModify: string = "";
  confirmPasswordToModify: string = "";
  addressToModify: string = "";
  usuarioID: string = "";

  constructor(private http: HttpClient, private totalCarrito: TotalCarritoService) { }

  async ngOnInit(): Promise<void> {
    this.usuarioID = sessionStorage.getItem('usuarioID') ?? localStorage.getItem('usuarioID') ?? "";
    const request$ = await this.http.get("https://localhost:7281/api/Usuarios/" + this.usuarioID)
    this.cuentaUser = await lastValueFrom(request$) as Usuario;
    this.nameUserToModify = this.cuentaUser.nombreUsuario;
    this.correoUserToModify = this.cuentaUser.correo;
    this.addressToModify = this.cuentaUser.direccion;

  }

  async modificaDatos() {

    const headers = { 'Content-Type': 'application/json' };
    let request$
    if (this.nameUserToModify.trim().length > 0) {
      if (this.correoUserToModify.trim().length > 0) {
        if (this.addressToModify.trim().length > 0) {
          if (this.passwordUserToModify.length > 0 || this.confirmPasswordToModify.length > 0) {
            if (this.passwordUserToModify == this.confirmPasswordToModify) {
              this.cuentaUser.nombreUsuario = this.nameUserToModify
              this.cuentaUser.direccion = this.addressToModify
              this.cuentaUser.correo = this.correoUserToModify
              this.cuentaUser.contrasena = this.passwordUserToModify
              request$ = await this.http.put("https://localhost:7281/api/Usuarios/modifyUser/"
                + this.usuarioID, JSON.stringify(this.cuentaUser), { headers });
              await lastValueFrom(request$)
              setTimeout(() => {
                location.reload();
              }, 1);
            } else {
              alert("Las contraseñas deben ser iguales.")
            }
          } else {
            this.cuentaUser.nombreUsuario = this.nameUserToModify
            this.cuentaUser.direccion = this.addressToModify
            this.cuentaUser.correo = this.correoUserToModify
            this.cuentaUser.contrasena = ""
            request$ = await this.http.put("https://localhost:7281/api/Usuarios/modifyUser/"
              + this.usuarioID, JSON.stringify(this.cuentaUser), { headers });
            await lastValueFrom(request$)
            setTimeout(() => {
              location.reload();
            }, 1);
          }
        } else {
          alert("La dirección no puede estar vacía")
        }
      } else {
        alert("Correo incorrecto")
      }
    } else {
      alert("El nombre está vacío");
    }


  }
  logOut() {
    sessionStorage.removeItem('usuarioID');
    localStorage.removeItem('usuarioID');
    sessionStorage.removeItem('JsonWebToken');
    localStorage.removeItem('JsonWebToken');
    this.totalCarrito.cambiarTotal();

  }

}
