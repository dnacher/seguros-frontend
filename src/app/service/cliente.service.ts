import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../model/Cliente';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  private baseUrl = `${environment.baseURL}/v1/clientes`;

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getClientesById(clienteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${clienteId}`);
  }

  getClientesByFechaNacimientoBetween(fechaDesde: Date, fechaHasta: Date): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/fecha-nacimiento/' + `/${fechaDesde}` + `/${fechaHasta}`);
  }

  getAniversario(diaInicio: number, diaFinal: number, mes: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/aniversario/' + `/${diaInicio}` + `/${diaFinal}` + `/${mes}`);
  }

  saveCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, cliente);
  }

  deleteClienteById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cliente);
  }

}
