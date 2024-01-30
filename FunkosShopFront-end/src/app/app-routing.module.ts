import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Sesion/landing/landing.component';
import { InicioSesionComponent } from './Sesion/inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './Sesion/registrarse/registrarse.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'signup', component: RegistrarseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
