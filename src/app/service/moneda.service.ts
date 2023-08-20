import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Moneda} from '../model/Moneda';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MonedasService {
  private baseUrl = `${environment.baseURL}/v1/monedas`;

  constructor(private http: HttpClient) {
  }

  getMonedas(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getMonedasById(monedaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${monedaId}`);
  }

  saveMoneda(moneda: Moneda): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, moneda);
  }

  deleteMonedaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateMoneda(id: number, moneda: Moneda): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, moneda);
  }

}
