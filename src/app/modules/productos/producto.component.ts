import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from '../../service/producto.service';
import {Producto} from '../../model/Producto';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {CompaniasService} from '../../service/compania.service';
import {Compania} from '../../model/Compania';
import {TipoProductoService} from '../../service/tipoProducto.service';
import {TipoProducto} from '../../model/TipoProducto';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})export class ProductoComponent implements OnInit {

  botonAgregar = 'Agregar Producto';
  titulo = 'Productos';
  tituloFormulario = 'Producto';
  producto: Producto = new Producto();

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
              private companiaService: CompaniasService,
              private tipoProductoService: TipoProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getProductos();
    this.mostrarTablaProductos();
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
    this.tipoProductoService.tipoProducto = new TipoProducto();
    this.companiaService.compania = new Compania();
    this.productoService.panelCRUD = true;
    this.companiaService.companiaTable = false;
    this.productoService.panelProductos = false;
    this.tipoProductoService.tipoProductoTable = false;
  }

  mostrarTablaProductos() {
    this.productoService.panelCRUD = false;
    this.companiaService.companiaTable = false;
    this.tipoProductoService.tipoProductoTable = false;
    this.productoService.panelProductos = true;
  }

  mostrarTablaTipoProductos() {
    this.productoService.panelCRUD = false;
    this.companiaService.companiaTable = false;
    this.productoService.panelProductos = false;
    this.tipoProductoService.tipoProductoTable = true;
    this.tipoProductoService.action = true;
  }


  mostrarTablaCompanias() {
    this.productoService.panelCRUD = false;
    this.companiaService.companiaTable = true;
    this.companiaService.action = true;
    this.productoService.panelProductos = false;
    this.tipoProductoService.tipoProductoTable = false;
  }

  closeCRUD() {
    this.mostrarTablaProductos();
    this.companiaService.compania = new Compania();
    this.tipoProductoService.tipoProducto = new TipoProducto();
    this.tipoProductoService.action = false;
  }

}
