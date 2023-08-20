import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { LoginComponent } from './modules/login/login.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './helpers/auth.interceptor';
import { BancosComponent } from './modules/bancos/bancos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ClienteComponent} from './modules/clientes/clientes.component';
import {CompaniasComponent} from './modules/companias/companias.component';
import {CotizacionVendedorComponent} from './modules/cotizacionVendedor/cotizacionVendedor.component';
import {CuotaPolizaComponent} from './modules/cuotaPoliza/cuotaPoliza.component';
import {EstadoPolizaComponent} from './modules/estadoPoliza/estadoPoliza.component';
import {EstadoSiniestroComponent} from './modules/estadoSiniestro/estadoSiniestro.component';
import {FormaPagoComponent} from './modules/formaPago/formaPago.component';
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
import { CompaniasTablaComponent } from './modules/companias/companias-tabla/companias-tabla.component';
import { TipoProductoTableComponent } from './modules/tipoProducto/tipo-producto-table/tipo-producto-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BancosComponent,
    ClienteComponent,
    CompaniasComponent,
    CotizacionVendedorComponent,
    CuotaPolizaComponent,
    EstadoPolizaComponent,
    EstadoSiniestroComponent,
    FormaPagoComponent,
    MonedaComponent,
    PermisoUsuarioComponent,
    PolizaComponent,
    ProductoComponent,
    RegistroCuotasComponent,
    SiniestroComponent,
    TipoProductoComponent,
    TipoUsuarioComponent,
    UsuarioComponent,
    VendedorComponent,
    CompaniasTablaComponent,
    TipoProductoTableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  exports: [

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
