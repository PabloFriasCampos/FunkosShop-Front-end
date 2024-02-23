import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private totalCarrito: TotalCarritoService, private api: APIService) {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;

    if (queryParams.has(this.PARAM_KEY)) {
      this.redirectTo = queryParams.get(this.PARAM_KEY);
    }
  }

  async registrarUsuario() {

    if (this.repetirContrasena == this.usuarioSignUp.contrasena
      && !(this.usuarioSignUp.contrasena.length == 0 ||
        this.usuarioSignUp.correo.length == 0 ||
        this.usuarioSignUp.direccion.length == 0 ||
        this.usuarioSignUp.nombreUsuario.length == 0)) {

      await this.api.registrarUsuario(this.usuarioSignUp);

      this.toggle = false;
      this.colorVentanas();

    } else {
      alert("Las contraseñas deben ser iguales y debes completar todos los campos");

    }
  }

  async iniciarSesion() {

    if (this.usuarioLogIn.correo.length == 0 || this.usuarioLogIn.contrasena.length == 0) {

      alert("Introduce correo y contraseña");

    } else {

      try {
        let logged: boolean = await this.api.iniciarSesion(this.usuarioLogIn, this.recuerdame);

        if (logged) {
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
    this.totalCarrito.cambiarTotal();

  }

  botonToggle() {
    this.toggle = !this.toggle;
    this.colorVentanas();
  }

  colorVentanas() {

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
