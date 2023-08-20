import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ingreso} from '../model/Ingreso';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IngresosService {
  private baseUrl = `${environment.baseURL}/v1/ingresos`;

  constructor(private http: HttpClient) {
  }

  getIngresos(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getIngresosById(ingresoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${ingresoId}`);
  }

  saveIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, ingreso);
  }

  deleteIngresoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateIngreso(id: number, ingreso: Ingreso): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, ingreso);
  }

}
