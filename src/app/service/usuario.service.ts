import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../model/Usuario';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private baseUrl = `${environment.baseURL}/v1/usuarios`;

  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getUsuariosById(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${usuarioId}`);
  }

  getUsuariosByNombre(usuarioNombre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/nombre/${usuarioNombre}`);
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, usuario);
  }

  deleteUsuarioById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, usuario);
  }

}
