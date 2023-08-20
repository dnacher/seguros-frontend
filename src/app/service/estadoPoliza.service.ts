import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstadoPolizaService {
  private baseUrl = `${environment.baseURL}/v1/estado-polizas`;

  constructor(private http: HttpClient) {
  }

  getEstadoPoliza(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getEstadoPolizaById(bancoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${bancoId}`);
  }

  saveEstadoPoliza(banco: Banco): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, banco);
  }

  deleteEstadoPolizaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateEstadoPoliza(id: number, banco: Banco): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, banco);
  }

}
