import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Compania} from '../model/Compania';

@Injectable({
  providedIn: 'root'
})

export class CompaniasService {
  private baseUrl = 'http://localhost:8080/api/v1/companias';

  constructor(private http: HttpClient) {
  }

  getCompanias(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getCompaniasById(companiaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${companiaId}`);
  }

  saveCompania(compania: Compania): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, compania);
  }

  deleteCompaniaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateCompania(id: number, compania: Compania): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, compania);
  }

}
