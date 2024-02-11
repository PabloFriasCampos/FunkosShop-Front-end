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

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'sesion', component: CombinacionComponent },
  { path: 'aboutus', component: SobreNosotrosComponent },
  { path: 'cart', component: CarritoComponent },
  { path: 'catalog', component: CatalogoComponent },
  { path: 'product/:productoID', component: DetalleProductoComponent },
  { path: 'confirm', component: ConfirmacionCompraComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }