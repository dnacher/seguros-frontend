import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';

@Injectable({
  providedIn: 'root'
})

export class EstadoSiniestroService {
  private baseUrl = 'http://localhost:8080/api/v1/estado-siniestros';

  constructor(private http: HttpClient) {
  }

  getEstadoSiniestro(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getEstadoSiniestroById(bancoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${bancoId}`);
  }

  saveEstadoSiniestro(banco: Banco): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, banco);
  }

  deleteEstadoSiniestroById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateEstadoSiniestro(id: number, banco: Banco): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, banco);
  }

}
