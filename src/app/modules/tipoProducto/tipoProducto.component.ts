import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoProductoService} from '../../service/tipoProducto.service';
import {TipoProducto} from '../../model/TipoProducto';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.scss']
})export class TipoProductoComponent implements OnInit {

  botonAgregar = 'Agregar Tipo Producto';
  titulo = 'Tipo de Productos';
  tituloFormulario = 'Tipo de Producto';
  tipoProducto: TipoProducto = new TipoProducto();
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
              private tipoProductoService: TipoProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getTipoProductos();
  }

  agregar() {
    this.tipoProducto = new TipoProducto();
    this.displayTable = false;
  }

  getTipoProductos() {
    this.tipoProductoService.getTipoProductos().subscribe({
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

  deleteTipoProducto(id: number) {
    this.tipoProductoService.deleteTipoProductoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Tipo Producto Eliminado', 'done');
        this.getTipoProductos();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.tipoProducto = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.tipoProducto) {
      console.log(this.tipoProducto);
      if (this.tipoProducto.id) {
        this.tipoProductoService
          .updateTipoProducto(this.tipoProducto.id, this.tipoProducto)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Tipo Producto Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.tipoProductoService.saveTipoProducto(this.tipoProducto).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Tipo Producto Agregado');
            this.getTipoProductos();
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
