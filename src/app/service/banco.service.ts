import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BancoService {
  private baseUrl = `${environment.baseURL}/v1/bancos`;

  constructor(private http: HttpClient) {
  }

  getBancos(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getBancosById(bancoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${bancoId}`);
  }

  saveBanco(banco: Banco): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, banco);
  }

  deleteBancoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateBanco(id: number, banco: Banco): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, banco);
  }

}
