import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Vendedor} from '../model/Vendedor';

@Injectable({
  providedIn: 'root'
})

export class VendedorService {
  private baseUrl = 'http://localhost:8080/api/v1/vendedors';

  constructor(private http: HttpClient) {
  }

  getVendedors(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getVendedorsById(vendedorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${vendedorId}`);
  }

  saveVendedor(vendedor: Vendedor): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, vendedor);
  }

  deleteVendedorById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateVendedor(id: number, vendedor: Vendedor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vendedor);
  }

}
