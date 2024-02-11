import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged(): boolean {

    let local = localStorage.getItem('JsonWebToken') != null;
    let sesion = sessionStorage.getItem('JsonWebToken') != null;

    return local || sesion;

  }

}
