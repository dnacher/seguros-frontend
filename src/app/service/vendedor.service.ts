import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Vendedor} from '../model/Vendedor';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VendedorService {
  private baseUrl = `${environment.baseURL}/v1/vendedores`;

  constructor(private http: HttpClient) {
  }

  getVendedores(): Observable<any> {
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
