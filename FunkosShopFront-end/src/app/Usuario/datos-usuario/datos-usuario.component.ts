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
export class DatosUsuarioComponent implements OnInit{
  cuentaUser: Usuario = new Usuario();
  modificarNameUser: string = "";
  modificarEmailUser: string = "";
  modificarContrasenaUser: string = "";
  modificarDireccionUser: string = "";
  usuarioID: string = "";

  constructor(private http: HttpClient, private totalCarrito: TotalCarritoService) { }

  async ngOnInit(): Promise<void>{
    this.usuarioID = sessionStorage.getItem('usuarioID') ?? localStorage.getItem('usuarioID') ?? "";
    const request$ = await this.http.get("https://localhost:7281/api/Usuarios/"  + this.usuarioID)
    this.cuentaUser = await lastValueFrom(request$) as Usuario;
    console.log(this.cuentaUser)
  }

  logOut() {
    sessionStorage.removeItem('usuarioID');
    localStorage.removeItem('usuarioID');
    sessionStorage.removeItem('JsonWebToken');
    localStorage.removeItem('JsonWebToken');
    this.totalCarrito.cambiarTotal();

  }

  async modificarNombre() {
    if (this.cuentaUser.nombreUsuario != this.modificarNameUser && this.modificarNameUser != "") {
      const headers = {'Content-Type':'application/json'};
  
      const request$ = await this.http.put("https://localhost:7281/api/Usuarios/modificarUser/" + this.usuarioID,  JSON.stringify(this.modificarNameUser) , {headers});
      await lastValueFrom(request$)

      alert("El nombre de usuario ha sido modificado con exito");
    } else {
      alert("Estás poniendo el mismo nombre de usuario o el campo está vacío");
    }
  }

  async modificarEmail() { // Sin terminar porque da error
    if (this.cuentaUser.correo != this.modificarEmailUser && this.modificarEmailUser != "") { // Comprueba que el correo que se ha metido no sea el mismo que el que tiene
        // Comprobar que el correo no está ya registrado
        const headers = {'Content-Type':'application/json'};
        const verificarEmail$ = await this.http.get("https://localhost:7281/api/Usuarios/verificarEmail/" + this.modificarEmailUser, {headers});
        const existeEmail = await lastValueFrom(verificarEmail$);
        
        if (existeEmail == false) {
            const request$ = await this.http.put("https://localhost:7281/api/Usuarios/modificarEmail/" + this.usuarioID,  JSON.stringify(this.modificarEmailUser) , {headers});
            await lastValueFrom(request$);
            alert("El correo ha sido modificado con éxito");
        } else {
            alert("Ya existe una cuenta asociada a ese correo. Por favor selecciona otro correo electrónico");
        }
    } else {
        alert("Estás poniendo el mismo email o el campo está vacío");
    }
}

  async modificarContrasena() { // Sin terminar porque da error
    if (this.cuentaUser.contrasena != this.modificarContrasenaUser && this.modificarContrasenaUser != "") {
      const headers = {'Content-Type':'application/json'};
  
      const request$ = await this.http.put("https://localhost:7281/api/Usuarios/modificarContrasena/" + this.usuarioID,  JSON.stringify(this.modificarContrasenaUser) , {headers});
      await lastValueFrom(request$)

      alert("La contraseña ha sido modificada con exito");
    } else {
      alert("Estas poniendo la misma contraseña o el campo está vacío");
    }
  }

  async modificarDireccion() {
    if (this.cuentaUser.direccion != this.modificarDireccionUser && this.modificarDireccionUser != "") {
      const headers = {'Content-Type':'application/json'};
  
      const request$ = await this.http.put("https://localhost:7281/api/Usuarios/modificarDireccion/" + this.usuarioID,  JSON.stringify(this.modificarDireccionUser) , {headers});
      await lastValueFrom(request$)

      alert("El correo ha sido modificado con exito");
    } else {
      alert("Estas poniendo la misma dirección o el campo está vacío");
    }
  }

}
