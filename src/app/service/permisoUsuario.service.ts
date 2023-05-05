import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PermisoUsuario} from '../model/PermisoUsuario';

@Injectable({
  providedIn: 'root'
})

export class PermisoUsuariosService {
  private baseUrl = 'http://localhost:8080/api/v1/permiso-usuarios';

  constructor(private http: HttpClient) {
  }

  getPermisoUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getPermisoUsuariosById(permisoUsuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${permisoUsuarioId}`);
  }

  savePermisoUsuario(permisoUsuario: PermisoUsuario): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, permisoUsuario);
  }

  deletePermisoUsuarioById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updatePermisoUsuario(id: number, permisoUsuario: PermisoUsuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, permisoUsuario);
  }

}
