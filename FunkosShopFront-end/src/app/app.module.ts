import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './Sesion/inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './Sesion/registrarse/registrarse.component';
import { LandingComponent } from './General/landing/landing.component';
import { SobreNosotrosComponent } from './General/sobre-nosotros/sobre-nosotros.component';
import { CatalogoComponent } from './Productos/catalogo/catalogo.component';
import { CarritoComponent } from './Compra/carrito/carrito.component';
import { DetalleProductoComponent } from './Productos/detalle-producto/detalle-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistrarseComponent,
    LandingComponent,
    SobreNosotrosComponent,
    CatalogoComponent,
    CarritoComponent,
    DetalleProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
