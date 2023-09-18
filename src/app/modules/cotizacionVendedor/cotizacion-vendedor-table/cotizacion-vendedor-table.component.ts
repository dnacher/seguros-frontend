import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CotizacionVendedoresService} from '../../../service/cotizacion-vendedores.service';
import {CoreService} from '../../../service/core.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-cotizacion-vendedor-table',
  templateUrl: './cotizacion-vendedor-table.component.html',
  styleUrls: ['./cotizacion-vendedor-table.component.scss']
})
export class CotizacionVendedorTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'nombre de producto',
    'vendedor',
    'comision nueva',
    'comision renovacion',
    'fecha inicio',
    'fecha fin',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(private cotizacionVendedorService: CotizacionVendedoresService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getCotizacionVendedores();
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCotizacionVendedor(id: number) {
    this.cotizacionVendedorService.deleteCotizacionVendedoresById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Cotizacion Vendedor Eliminado', 'done');
        this.getCotizacionVendedores();
      },
      error: console.log,
    });
  }

  getCotizacionVendedores() {
    this.cotizacionVendedorService.getCotizacionVendedores().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.cotizacionVendedorService.cotizacionVendedor = data;
    this.cotizacionVendedorService.displayTable = false;
  }

}
