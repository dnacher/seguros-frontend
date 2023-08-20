import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoProductoService} from '../../service/tipoProducto.service';
import {TipoProducto} from '../../model/TipoProducto';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {TipoProductoTableComponent} from './tipo-producto-table/tipo-producto-table.component';
import {ProductoService} from '../../service/producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.scss']
})export class TipoProductoComponent implements OnInit {

  botonAgregar = 'Agregar Tipo Producto';
  titulo = 'Tipo de Productos';
  tituloFormulario = 'Tipo de Producto';

  @ViewChild(TipoProductoTableComponent, {static: false}) tipoProductoTable: TipoProductoTableComponent;

  constructor(private dialog: MatDialog,
              private tipoProductoService: TipoProductoService,
              private productoService: ProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.tipoProductoService.tipoProductoTable = true;
    this.tipoProductoService.action = false;
  }

  agregar() {
    this.tipoProductoService.tipoProducto = new TipoProducto();
    this.tipoProductoService.tipoProductoTable = false;
  }

  onFormSubmit() {
    if (this.tipoProductoService.tipoProducto) {
      console.log(this.tipoProductoService.tipoProducto);
      if (this.tipoProductoService.tipoProducto.id) {
        this.tipoProductoService
          .updateTipoProducto(this.tipoProductoService.tipoProducto.id, this.tipoProductoService.tipoProducto)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Tipo Producto Actualizado');
              this.closeCRUD();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.tipoProductoService.saveTipoProducto(this.tipoProductoService.tipoProducto).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Tipo Producto Agregado');
            this.tipoProductoTable.getTipoProductos();
            this.closeCRUD();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  closeCRUD() {
    this.tipoProductoService.tipoProductoTable = true;
    this.tipoProductoService.action = false;
  }

  // setTipoProducto(row) {
  //   this.tipoProductoService.tipoProducto = row;
  //   this.tipoProductoService.tipoProductoTable = false;
  //   this.productoService.panelCRUD = true;
  // }

}
