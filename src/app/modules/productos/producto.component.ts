import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from '../../service/producto.service';
import {Producto} from '../../model/Producto';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {CompaniasService} from '../../service/compania.service';
import {Compania} from '../../model/Compania';
import {TipoProductoService} from '../../service/tipoProducto.service';
import {TipoProducto} from '../../model/TipoProducto';
import {ProductoTableComponent} from './producto-table/producto-table.component';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})export class ProductoComponent implements OnInit {

  @ViewChild (ProductoTableComponent, {static: false}) productoTable: ProductoTableComponent;

  botonAgregar = 'Agregar Producto';

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

  constructor(private dialog: MatDialog,
              private productoService: ProductoService,
              private companiaService: CompaniasService,
              private tipoProductoService: TipoProductoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.mostrarTablaProductos();
    console.log(this.productoService.panelProductos);
  }

  agregar() {
    this.productoService.producto = new Producto();
    this.mostrarCRUD();
  }

  onFormSubmit() {
    if (this.productoService.producto) {
      console.log(this.productoService.producto);
      if (this.productoService.producto.id) {
        this.productoService
          .updateProducto(this.productoService.producto.id, this.productoService.producto)
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
        this.productoService.saveProducto(this.productoService.producto).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Producto Agregado');
            this.productoTable.getProductos();
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
