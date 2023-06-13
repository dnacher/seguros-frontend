import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from '../../service/producto.service';
import {Producto} from '../../model/Producto';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})export class ProductoComponent implements OnInit {

  botonAgregar = 'Agregar Producto';
  titulo = 'Productos';
  tituloFormulario = 'Producto';
  producto: Producto = new Producto();
  panelCRUD = false;
  panelCompania = false;
  panelProductos = false;

  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'descripcion',
    'compania',
    'tipoProducto',
    'comisionNueva',
    'comisionRenovacion',
    'action',
  ];
  columnaProducto: string[] = [
    'uuid',
    'nombre',
    'descripcion',
    'email',
    'telfono',
    'web',
    'numeroAuxilio',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;


  constructor(private dialog: MatDialog,
              private productoService: ProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getProductos();
  }

  agregar() {
    this.producto = new Producto();
    this.mostrarCRUD();
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
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

  deleteProducto(id: number) {
    this.productoService.deleteProductoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Producto Eliminado', 'done');
        this.getProductos();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.producto = data;
    this.mostrarCRUD();
  }

  onFormSubmit() {
    if (this.producto) {
      console.log(this.producto);
      if (this.producto.id) {
        this.productoService
          .updateProducto(this.producto.id, this.producto)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Producto Actualizado');
              this.mostrarTablaProductos();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.productoService.saveProducto(this.producto).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Producto Agregado');
            this.getProductos();
            this.mostrarTablaProductos();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  mostrarCRUD() {
    this.panelCRUD = true;
    this.panelCompania = false;
    this.panelProductos = false;
  }

  mostrarTablaProductos() {
    this.panelCRUD = false;
    this.panelCompania = false;
    this.panelProductos = true;
  }

  mostrarTablaCompanias() {
    this.panelCRUD = false;
    this.panelCompania = true;
    this.panelProductos = false;
  }

  closeCRUD() {
    this.mostrarTablaProductos();
  }

  setCompania(row) {
    this.producto.compania = row;
  }

}
