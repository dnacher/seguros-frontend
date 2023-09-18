import {Component, OnInit, ViewChild} from '@angular/core';
import {VendedorService} from '../../../service/vendedor.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {CoreService} from '../../../service/core.service';

@Component({
  selector: 'app-vendedor-table',
  templateUrl: './vendedor-table.component.html',
  styleUrls: ['./vendedor-table.component.scss']
})
export class VendedorTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'apellido',
    'direccion',
    'departamento',
    'celular',
    'action',
  ];

  constructor(private vendedorService: VendedorService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getVendedores();
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    this.vendedorService.vendedor = data;
    this.vendedorService.vendedorTable = false;
  }

  getVendedores() {
    this.vendedorService.getVendedores().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteVendedor(id: number) {
    this.vendedorService.deleteVendedorById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Vendedor Eliminado', 'done');
        this.getVendedores();
      },
      error: console.log,
    });
  }

}
