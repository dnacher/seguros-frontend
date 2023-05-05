import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TipoProducto} from '../model/TipoProducto';

@Injectable({
  providedIn: 'root'
})

export class TipoProductoService {
  private baseUrl = 'http://localhost:8080/api/v1/tipo-productos';

  constructor(private http: HttpClient) {
  }

  getTipoProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getTipoProductosById(tipoProductoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${tipoProductoId}`);
  }

  saveTipoProducto(tipoProducto: TipoProducto): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, tipoProducto);
  }

  deleteTipoProductoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateTipoProducto(id: number, tipoProducto: TipoProducto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tipoProducto);
  }

}
