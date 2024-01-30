export class Usuario {

  NombreUsuario: string;
  Direccion: string;
  Correo: string;
  Contrasena: string;

  constructor(NombreUsuario: string = '', Direccion: string = '', Correo: string = '', Contrasena: string = '') {
    this.NombreUsuario = NombreUsuario;
    this.Direccion = Direccion;
    this.Correo = Correo;
    this.Contrasena = Contrasena
  }

}