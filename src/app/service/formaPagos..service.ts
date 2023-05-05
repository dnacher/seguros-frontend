import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormaPago} from '../model/FormaPago';

@Injectable({
  providedIn: 'root'
})

export class FormaPagoService {
  private baseUrl = 'http://localhost:8080/api/v1/forma-pago';

  constructor(private http: HttpClient) {
  }

  getFormaPago(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getFormaPagoById(formaPagoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${formaPagoId}`);
  }

  saveFormaPago(formaPago: FormaPago): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, formaPago);
  }

  deleteFormaPagoById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateFormaPago(id: number, formaPago: FormaPago): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formaPago);
  }

}
