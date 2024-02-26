import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './General/landing/landing.component';
import { SobreNosotrosComponent } from './General/sobre-nosotros/sobre-nosotros.component';
import { CarritoComponent } from './Compra/carrito/carrito.component';
import { CatalogoComponent } from './Productos/catalogo/catalogo.component';
import { DetalleProductoComponent } from './Productos/detalle-producto/detalle-producto.component';
import { ConfirmacionCompraComponent } from './Compra/confirmacion-compra/confirmacion-compra.component';
import { CombinacionComponent } from './Sesion/combinacion/combinacion.component';
import { authGuard } from './auth.guard';
import { PanelUsuarioComponent } from './Usuario/panel-usuario/panel-usuario.component';
import { DatosUsuarioComponent } from './Usuario/datos-usuario/datos-usuario.component';
import { ListaPedidosUsuarioComponent } from './Usuario/detalles-pedido/lista-pedidos-usuario.component';
import { ListaProductosComponent } from './Admin/lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './Admin/lista-usuarios/lista-usuarios.component';
import { AdminProductoComponent } from './Admin/admin-producto/admin-producto.component';
import { AdminUsuarioComponent } from './Admin/admin-usuario/admin-usuario.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'sesion', component: CombinacionComponent },
  { path: 'sesion', component: CombinacionComponent },
  { path: 'aboutus', component: SobreNosotrosComponent },
  { path: 'cart', component: CarritoComponent },
  { path: 'catalog', component: CatalogoComponent },
  { path: 'product/:productoID', component: DetalleProductoComponent },
  { path: 'confirm', component: ConfirmacionCompraComponent, canActivate: [authGuard] },
  { path: 'user', component: PanelUsuarioComponent, canActivate: [authGuard] },
  { path: 'userPedido/:pedidoID', component: ListaPedidosUsuarioComponent, canActivate: [authGuard] },
  { path: 'userDatos', component: DatosUsuarioComponent, canActivate: [authGuard] },
  { path: 'adminProductos', component: ListaProductosComponent, canActivate: [authGuard] },
  { path: 'adminUsuarios', component: ListaUsuariosComponent, canActivate: [authGuard] },
  { path: 'adminProducto/:productoID', component: AdminProductoComponent, canActivate: [authGuard] },
  { path: 'adminUsuario/:usuarioID', component: AdminUsuarioComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }