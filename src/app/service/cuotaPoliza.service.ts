import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';

@Injectable({
  providedIn: 'root'
})

export class CuotaPolizaService {
  private baseUrl = 'http://localhost:8080/api/v1/cuotas-polizas';

  constructor(private http: HttpClient) {
  }

  getCuotaPoliza(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getCuotaPolizaById(bancoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${bancoId}`);
  }

  saveBanco(banco: Banco): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, banco);
  }

  deleteBancoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateBanco(id: number, banco: Banco): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, banco);
  }

}
