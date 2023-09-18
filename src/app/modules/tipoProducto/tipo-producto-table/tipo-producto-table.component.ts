import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoProductoService} from '../../../service/tipoProducto.service';
import {CoreService} from '../../../service/core.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {ProductoService} from '../../../service/producto.service';

@Component({
  selector: 'app-tipo-producto-table',
  templateUrl: './tipo-producto-table.component.html',
  styleUrls: ['./tipo-producto-table.component.scss']
})
export class TipoProductoTableComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'descripcion',
    'action',
  ];

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  constructor(private tipoProductoService: TipoProductoService,
              private productoService: ProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getTipoProductos();
    this.productoService.panelProductos = true;
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

  openEditForm(data: any) {
    this.tipoProductoService.tipoProducto = data;
    this.tipoProductoService.tipoProductoTable = false;
  }

  closeCRUD() {
    this.tipoProductoService.tipoProductoTable = true;
    this.tipoProductoService.action = false;
  }

  setTipoProducto(row) {
    this.tipoProductoService.tipoProducto = row;
    this.tipoProductoService.tipoProductoTable = false;
    this.productoService.panelCRUD = true;
    this.tipoProductoService.action = false;
  }

}
