import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './General/landing/landing.component';
import { InicioSesionComponent } from './Sesion/inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './Sesion/registrarse/registrarse.component';
import { SobreNosotrosComponent } from './General/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'signup', component: RegistrarseComponent },
  { path: 'aboutus', component: SobreNosotrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }