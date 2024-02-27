import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  isLogged(): boolean {

    let local = localStorage.getItem('JsonWebToken') != null;
    let sesion = sessionStorage.getItem('JsonWebToken') != null;

    return local || sesion;

  }

  isAdmin(): boolean {
    const JWT = sessionStorage.getItem('JsonWebToken')
    let role
    if (JWT != null) {
      const decodedToken = this.helper.decodeToken(JWT);
      role = decodedToken.role
      
    }
    
    return role == "ADMIN";
  }

}
