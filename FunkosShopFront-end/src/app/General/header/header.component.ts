import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cantidadCarrito = 0;

  constructor(private auth: AuthService, private totalCarrito: TotalCarritoService) { }

  ngOnInit(): void {
    this.totalCarrito.totalActual.subscribe(total => this.cantidadCarrito = total);
    this.totalCarrito.cambiarTotal();
  }

  logged(): boolean {
    return this.auth.isLogged()

  }

}
