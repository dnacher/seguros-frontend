import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banco} from '../model/Banco';

@Injectable({
  providedIn: 'root'
})

export class BancosService {
  private baseUrl = 'http://localhost:8080/api/v1/bancos';

  constructor(private http: HttpClient) {
  }

  getBancos(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

}
