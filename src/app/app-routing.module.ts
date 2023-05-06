import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {LoginComponent} from './modules/login/login.component';
import {BancosComponent} from './modules/bancos/bancos.component';
import {AuthGuard} from './helpers/auth.guard';
import {ClienteComponent} from './modules/clientes/clientes.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    {
    path: 'dashboard',
    component: DashboardComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'bancos',
      component: BancosComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'clientes',
      component: ClienteComponent,
      canActivate: [AuthGuard]
    },
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
