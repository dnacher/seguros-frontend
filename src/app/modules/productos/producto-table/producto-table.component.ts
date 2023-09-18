import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from '../../../service/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {CoreService} from '../../../service/core.service';
import {TipoProducto} from '../../../model/TipoProducto';
import {Compania} from '../../../model/Compania';
import {TipoProductoService} from '../../../service/tipoProducto.service';
import {CompaniasService} from '../../../service/compania.service';

@Component({
  selector: 'app-producto-table',
  templateUrl: './producto-table.component.html',
  styleUrls: ['./producto-table.component.scss']
})
export class ProductoTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  constructor(private productoService: ProductoService,
              private coreService: CoreService,
              private tipoProductoService: TipoProductoService,
              private companiaService: CompaniasService) { }

  dataSource!: MatTableDataSource<any>;

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

  ngOnInit() {
    this.getProductos();
  }

  openEditForm(data: any) {
    this.productoService.producto = data;
    this.mostrarCRUD();
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  deleteProducto(id: number) {
    this.productoService.deleteProductoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Producto Eliminado', 'done');
        this.getProductos();
      },
      error: console.log,
    });
  }

  mostrarCRUD() {
    this.tipoProductoService.tipoProducto = new TipoProducto();
    this.companiaService.compania = new Compania();
    this.productoService.panelCRUD = true;
    this.companiaService.companiaTable = false;
    this.productoService.panelProductos = false;
    this.tipoProductoService.tipoProductoTable = false;
  }

  setProducto(row) {
    this.productoService.producto = row;
    this.productoService.panelProductos = false;
    this.productoService.panelCRUD = true;
  }

}
