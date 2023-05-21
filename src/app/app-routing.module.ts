import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {LoginComponent} from './modules/login/login.component';
import {BancosComponent} from './modules/bancos/bancos.component';
import {AuthGuard} from './helpers/auth.guard';
import {ClienteComponent} from './modules/clientes/clientes.component';
import {CompaniasComponent} from './modules/companias/companias.component';
import {CotizacionVendedorComponent} from './modules/cotizacionVendedor/cotizacionVendedor.component';
import {CuotaPolizaComponent} from './modules/cuotaPoliza/cuotaPoliza.component';
import {EstadoSiniestroComponent} from './modules/estadoSiniestro/estadoSiniestro.component';
import {EstadoPolizaComponent} from './modules/estadoPoliza/estadoPoliza.component';
import {FormaPagoComponent} from './modules/formaPago/formaPago.component';
import {IngresoComponent} from './modules/ingreso/ingreso.component';
import {MonedaComponent} from './modules/monedas/moneda.component';
import {PermisoUsuarioComponent} from './modules/permisoUsuario/permisoUsuario.component';
import {PolizaComponent} from './modules/poliza/poliza.component';
import {ProductoComponent} from './modules/productos/producto.component';
import {RegistroCuotasComponent} from './modules/registroCuotas/registroCuotas.component';
import {SiniestroComponent} from './modules/siniestro/siniestro.component';
import {TipoProductoComponent} from './modules/tipoProducto/tipoProducto.component';
import {TipoUsuarioComponent} from './modules/tipoUsuario/tipoUsuario.component';
import {UsuarioComponent} from './modules/usuario/usuario.component';
import {VendedorComponent} from './modules/vendedor/vendedor.component';

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
    {
      path: 'companias',
      component: CompaniasComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'cotizacion-vendedores',
      component: CotizacionVendedorComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'cuota-poliza',
      component: CuotaPolizaComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'estado-poliza',
      component: EstadoPolizaComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'estado-siniestro',
      component: EstadoSiniestroComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'forma-pago',
      component: FormaPagoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ingreso',
      component: IngresoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'moneda',
      component: MonedaComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'permiso-usuario',
      component: PermisoUsuarioComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'poliza',
      component: PolizaComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'producto',
      component: ProductoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'registro-cuotas',
      component: RegistroCuotasComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'siniestro',
      component: SiniestroComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'tipo-producto',
      component: TipoProductoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'tipo-usuario',
      component: TipoUsuarioComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'usuario',
      component: UsuarioComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'vendedor',
      component: VendedorComponent,
      canActivate: [AuthGuard]
    },
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
