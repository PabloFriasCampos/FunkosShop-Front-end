export class Usuario {

  nombreUsuario: string;
  direccion: string;
  correo: string;
  contrasena: string;

  constructor(NombreUsuario: string = '', Direccion: string = '', Correo: string = '', Contrasena: string = '') {
    this.nombreUsuario = NombreUsuario;
    this.direccion = Direccion;
    this.correo = Correo;
    this.contrasena = Contrasena
  }

}