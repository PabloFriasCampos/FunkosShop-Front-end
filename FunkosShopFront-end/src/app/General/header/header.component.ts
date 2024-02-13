import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cantidadCarrito = 0;

  constructor(private auth: AuthService) { }


  logged(): boolean {
    return this.auth.isLogged()

  }

}
