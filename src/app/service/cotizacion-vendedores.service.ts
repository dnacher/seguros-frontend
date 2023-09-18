import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CotizacionVendedor} from '../model/CotizacionVendedor';
import {environment} from '../../environments/environment';
import {ProductoService} from './producto.service';
import {VendedorService} from './vendedor.service';

@Injectable({
  providedIn: 'root'
})

export class CotizacionVendedoresService {
  private baseUrl = `${environment.baseURL}/v1/cotizacion-vendedores`;
  cotizacionVendedor: CotizacionVendedor = new CotizacionVendedor();
  displayTable = true;
  displayCRUD = false;
  tituloFormulario = 'Cotizacion Vendedor';
  titulo = this.tituloFormulario;
  constructor(private http: HttpClient,
              private productoService: ProductoService,
              private vendedorService: VendedorService) {
  }

  mostrarCRUDCotizacionVendedores() {
    this.displayCRUD = true;
    this.displayTable = false;
    this.productoService.panelProductos = false;
    this.productoService.action = false;
    this.vendedorService.vendedorTable = false;
  }

  mostrarTablaCotizacionVendedores() {
    this.displayCRUD = false;
    this.displayTable = true;
    this.productoService.panelProductos = false;
    this.productoService.action = false;
    this.vendedorService.vendedorTable = false;
  }

  mostrarTablaProductos() {
    this.displayCRUD = false;
    this.displayTable = false;
    this.productoService.panelProductos = true;
    this.productoService.action = true;
    this.vendedorService.vendedorTable = false;
  }

  mostrarTablaVendedor() {
    this.displayCRUD = false;
    this.displayTable = false;
    this.productoService.panelProductos = false;
    this.productoService.action = false;
    this.vendedorService.vendedorTable = true;
  }

  getCotizacionVendedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/');
  }

  getCotizacionVendedoresById(cotizacionVendedoresId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/${cotizacionVendedoresId}`);
  }

  saveCotizacionVendedores(cotizacionVendedores: CotizacionVendedor): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/`, cotizacionVendedores);
  }

  deleteCotizacionVendedoresById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/${id}`);
  }

  updateCotizacionVendedores(id: number, cotizacionVendedores: CotizacionVendedor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, cotizacionVendedores);
  }

}
