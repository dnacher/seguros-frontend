import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';
import {CuotaPoliza} from '../model/CuotaPoliza';

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

  getCuotaPolizaById(cuotaPolizaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${cuotaPolizaId}`);
  }

  saveCuotaPoliza(cuotaPoliza: CuotaPoliza): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, cuotaPoliza);
  }

  deleteCuotaPolizaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateCuotaPoliza(id: number, cuotaPoliza: CuotaPoliza): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cuotaPoliza);
  }

}
