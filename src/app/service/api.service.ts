import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Credentials} from '../model/Credentials';
import { map } from 'rxjs/operators';
import {Usuario} from '../model/Usuario';
import {UsuarioService} from './usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import {SidebarComponent} from '../shared/components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usuario: Usuario = new Usuario();
  public user: string;
  public userType: string;

  constructor(private http: HttpClient, private usarioService: UsuarioService) {
    this.user = localStorage.getItem('usuarioNombre');
    this.userType = localStorage.getItem('tipoUsuario');
  }

  login(creds: Credentials) {
    return this.http.post('http://localhost:8080/login', creds,{
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');
      localStorage.setItem('token', token);

      this.usarioService.getUsuariosByNombre(creds.email).subscribe({
        next: (res) => {
          localStorage.setItem('usuarioNombre', res.nombre);
          localStorage.setItem('tipoUsuario', res.tipoUsuario.nombre);
          this.user = res.nombre;
          this.userType = res.tipoUsuario.nombre;
        },
        error: console.log,
      });
      return body;
    }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('tipoUsuario');
    this.user = '';
    this.userType = '';
  }
}
