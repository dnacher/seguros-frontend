import {Component, OnInit, ViewChild} from '@angular/core';
import {CotizacionVendedor} from '../../model/CotizacionVendedor';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {CotizacionVendedoresService} from '../../service/cotizacion-vendedores.service';

@Component({
  selector: 'app-cotizacion-vendedores',
  templateUrl: './CotizacionVendedor.component.html',
  styleUrls: ['./CotizacionVendedor.component.scss']
})export class CotizacionVendedorComponent implements OnInit {

  botonAgregar = 'Agregar Cotizacion Vendedor';
  titulo = 'Cotizacion Vendedores';
  tituloFormulario = 'Cotizacion Vendedor';
  cotizacionVendedor: CotizacionVendedor = new CotizacionVendedor();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'action',
  ];
  displayTable = true;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;


  constructor(private dialog: MatDialog,
              private cotizacionVendedorService: CotizacionVendedoresService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getCotizacionVendedors();
  }

  agregar() {
    this.cotizacionVendedor = new CotizacionVendedor();
    this.displayTable = false;
  }

  getCotizacionVendedors() {
    this.cotizacionVendedorService.getCotizacionVendedores().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
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
        this.getCotizacionVendedors();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.cotizacionVendedor = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.cotizacionVendedor) {
      console.log(this.cotizacionVendedor);
      if (this.cotizacionVendedor.id) {
        this.cotizacionVendedorService
          .updateCotizacionVendedores(this.cotizacionVendedor.id, this.cotizacionVendedor)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Cotizacion Vendedor Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.cotizacionVendedorService.saveCotizacionVendedores(this.cotizacionVendedor).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Cotizacion Vendedor Agregado');
            this.getCotizacionVendedors();
            this.displayTable = true;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  closeCRUD() {
    this.displayTable = true;
  }

}
