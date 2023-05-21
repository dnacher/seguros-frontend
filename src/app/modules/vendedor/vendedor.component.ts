import {Component, OnInit, ViewChild} from '@angular/core';
import {VendedorService} from '../../service/vendedor.service';
import {Vendedor} from '../../model/Vendedor';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})export class VendedorComponent implements OnInit {

  botonAgregar = 'Agregar Vendedor';
  titulo = 'Vendedores';
  tituloFormulario = 'Vendedor';
  vendedor: Vendedor = new Vendedor();
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
              private vendedorService: VendedorService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getVendedors();
  }

  agregar() {
    this.vendedor = new Vendedor();
    this.displayTable = false;
  }

  getVendedors() {
    this.vendedorService.getVendedors().subscribe({
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

  deleteVendedor(id: number) {
    this.vendedorService.deleteVendedorById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Vendedor Eliminado', 'done');
        this.getVendedors();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.vendedor = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.vendedor) {
      console.log(this.vendedor);
      if (this.vendedor.id) {
        this.vendedorService
          .updateVendedor(this.vendedor.id, this.vendedor)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Vendedor Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.vendedorService.saveVendedor(this.vendedor).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Vendedor Agregado');
            this.getVendedors();
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
