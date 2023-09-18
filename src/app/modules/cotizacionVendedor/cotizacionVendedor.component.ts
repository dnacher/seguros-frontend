import {Component, OnInit, ViewChild} from '@angular/core';
import {CotizacionVendedor} from '../../model/CotizacionVendedor';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {CotizacionVendedoresService} from '../../service/cotizacion-vendedores.service';
import {ProductoService} from '../../service/producto.service';
import {CotizacionVendedorTableComponent} from './cotizacion-vendedor-table/cotizacion-vendedor-table.component';
import {VendedorService} from '../../service/vendedor.service';

@Component({
  selector: 'app-cotizacion-vendedores',
  templateUrl: './CotizacionVendedor.component.html',
  styleUrls: ['./CotizacionVendedor.component.scss']
})export class CotizacionVendedorComponent implements OnInit {

  botonAgregar = 'Agregar Cotizacion Vendedor';

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;
  @ViewChild(CotizacionVendedorTableComponent, {static: false}) cotizacionVendedorTable: CotizacionVendedorTableComponent;


  constructor(private dialog: MatDialog,
              private cotizacionVendedorService: CotizacionVendedoresService,
              private coreService: CoreService,
              private productoService: ProductoService,
              private vendedorService: VendedorService) { }

  ngOnInit() {
    this.cotizacionVendedorService.mostrarTablaCotizacionVendedores();
  }

  agregar() {
    this.cotizacionVendedorService.cotizacionVendedor = new CotizacionVendedor();
    this.cotizacionVendedorService.mostrarCRUDCotizacionVendedores();
  }

  onFormSubmit() {
    if (this.cotizacionVendedorService.cotizacionVendedor) {
      if(this.productoService.producto.id && this.vendedorService.vendedor.id){
        console.log(this.cotizacionVendedorService.cotizacionVendedor);
        if (this.cotizacionVendedorService.cotizacionVendedor.id) {
          this.cotizacionVendedorService
            // tslint:disable-next-line:max-line-length
            .updateCotizacionVendedores(this.cotizacionVendedorService.cotizacionVendedor.id, this.cotizacionVendedorService.cotizacionVendedor)
            .subscribe({
              next: (val: any) => {
                this.coreService.openSnackBar('Cotizacion Vendedor Actualizado');
                this.cotizacionVendedorService.displayTable = true;
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } else {
          this.cotizacionVendedorService.saveCotizacionVendedores(this.cotizacionVendedorService.cotizacionVendedor).subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Cotizacion Vendedor Agregado');
              this.cotizacionVendedorTable.getCotizacionVendedores();
              this.cotizacionVendedorService.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      } else {
        console.error('falta producto o vendedor');
      }
    }
  }
}
