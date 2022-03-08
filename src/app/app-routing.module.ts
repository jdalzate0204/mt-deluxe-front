import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cliente/login/login.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { ServicioComponent } from './cliente/servicio/servicio.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'paginaInicio', component: PrincipalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'servicio', component: ServicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
