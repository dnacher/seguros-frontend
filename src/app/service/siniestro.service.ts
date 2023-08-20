import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Siniestro} from '../model/Siniestro';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SiniestroService {
  private baseUrl = `${environment.baseURL}/v1/siniestros`;

  constructor(private http: HttpClient) {
  }

  getSiniestros(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getSiniestrosById(siniestroId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${siniestroId}`);
  }

  saveSiniestro(siniestro: Siniestro): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, siniestro);
  }

  deleteSiniestroById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateSiniestro(id: number, siniestro: Siniestro): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, siniestro);
  }

}
