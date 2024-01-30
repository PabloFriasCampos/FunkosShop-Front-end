export class Usuario {

  NombreUsuario: string;
  Direccion: string;
  Correo: string;
  Contrasena: string;
  Rol: string;

  constructor(NombreUsuario: string = '', Direccion: string = '', Correo: string = '', Contrasena: string = '', Rol: string = '') {
    this.NombreUsuario = NombreUsuario;
    this.Direccion = Direccion;
    this.Correo = Correo;
    this.Contrasena = Contrasena;
    this.Rol = Rol;
  }

}