import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  constructor() { }

  logged(): boolean {

    let local = localStorage.getItem('JsonWebToken') != null;
    let sesion = sessionStorage.getItem('JsonWebToken') != null;

    return local || sesion;

  }

}
