import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Poliza} from '../model/Poliza';

@Injectable({
  providedIn: 'root'
})

export class PolizasService {
  private baseUrl = 'http://localhost:8080/api/v1/polizas';

  constructor(private http: HttpClient) {
  }

  getPolizas(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getPolizasById(polizaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${polizaId}`);
  }

  savePoliza(poliza: Poliza): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, poliza);
  }

  deletePolizaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updatePoliza(id: number, poliza: Poliza): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, poliza);
  }

}
