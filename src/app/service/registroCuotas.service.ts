import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegistroCuotas} from '../model/RegistroCuotas';

@Injectable({
  providedIn: 'root'
})

export class RegistroCuotasService {
  private baseUrl = 'http://localhost:8080/api/v1/registro-Cuotas';

  constructor(private http: HttpClient) {
  }

  getRegistroCuotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getRegistroCuotasById(registroCuotasId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${registroCuotasId}`);
  }

  saveRegistroCuotas(registroCuotas: RegistroCuotas): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, registroCuotas);
  }

  deleteRegistroCuotasById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateRegistroCuotas(id: number, registroCuotas: RegistroCuotas): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, registroCuotas);
  }

}
