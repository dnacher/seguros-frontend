import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CotizacionVendedor} from '../model/CotizacionVendedor';

@Injectable({
  providedIn: 'root'
})

export class CotizacionVendedoresService {
  private baseUrl = 'http://localhost:8080/api/v1/cotizacion-vendedores';

  constructor(private http: HttpClient) {
  }

  getCotizacionVendedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getCotizacionVendedoresById(cotizacionVendedoresId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${cotizacionVendedoresId}`);
  }

  saveCotizacionVendedores(cotizacionVendedores: CotizacionVendedor): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, cotizacionVendedores);
  }

  deleteCotizacionVendedoresById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateCotizacionVendedores(id: number, cotizacionVendedores: CotizacionVendedor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cotizacionVendedores);
  }

}
