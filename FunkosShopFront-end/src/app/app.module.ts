import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './General/landing/landing.component';
import { SobreNosotrosComponent } from './General/sobre-nosotros/sobre-nosotros.component';
import { CatalogoComponent } from './Productos/catalogo/catalogo.component';
import { CarritoComponent } from './Compra/carrito/carrito.component';
import { DetalleProductoComponent } from './Productos/detalle-producto/detalle-producto.component';
import { ConfirmacionCompraComponent } from './Compra/confirmacion-compra/confirmacion-compra.component';
import { CombinacionComponent } from './Sesion/combinacion/combinacion.component';
import { HeaderComponent } from './General/header/header.component';
import { PanelUsuarioComponent } from './Usuario/panel-usuario/panel-usuario.component';
import { DatosUsuarioComponent } from './Usuario/datos-usuario/datos-usuario.component';
import { ListaPedidosUsuarioComponent } from './Usuario/lista-pedidos-usuario/lista-pedidos-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SobreNosotrosComponent,
    CatalogoComponent,
    CarritoComponent,
    DetalleProductoComponent,
    ConfirmacionCompraComponent,
    CombinacionComponent,
    HeaderComponent,
    PanelUsuarioComponent,
    DatosUsuarioComponent,
    ListaPedidosUsuarioComponent
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
