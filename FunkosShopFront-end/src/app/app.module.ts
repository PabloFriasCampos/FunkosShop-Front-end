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
import { ListaPedidosUsuarioComponent } from './Usuario/detalles-pedido/lista-pedidos-usuario.component';
import { ListaUsuariosComponent } from './Admin/lista-usuarios/lista-usuarios.component';
import { ListaProductosComponent } from './Admin/lista-productos/lista-productos.component';
import { AdminProductoComponent } from './Admin/admin-producto/admin-producto.component';
import { AdminUsuarioComponent } from './Admin/admin-usuario/admin-usuario.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { timeout } from 'rxjs';
import { CrearProductoComponent } from './Admin/crear-producto/crear-producto.component';



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
    ListaPedidosUsuarioComponent,
    ListaUsuariosComponent,
    ListaProductosComponent,
    AdminProductoComponent,
    AdminUsuarioComponent,
    CrearProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxToastNotifierModule.forRoot(
      {timeOut: 5000,
        bgColors: {
          success: '#54a254',
          info: '#1976d2',
          warning: '#FF9B00',
          danger: '#da2d2d',
        }
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
