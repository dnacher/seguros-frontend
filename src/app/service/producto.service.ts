import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../model/Producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private baseUrl = 'http://localhost:8080/api/v1/productos';

  constructor(private http: HttpClient) {
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getProductosById(productoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${productoId}`);
  }

  saveProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, producto);
  }

  deleteProductoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, producto);
  }

}
