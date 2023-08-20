import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TipoProducto} from '../model/TipoProducto';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TipoProductoService {
  private baseUrl = `${environment.baseURL}/v1/tipo-productos`;
  tipoProducto: TipoProducto = new TipoProducto();
  tipoProductoTable = true;
  action = false;

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
