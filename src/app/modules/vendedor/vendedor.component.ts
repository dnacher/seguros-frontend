import {Component, OnInit, ViewChild} from '@angular/core';
import {VendedorService} from '../../service/vendedor.service';
import {Vendedor} from '../../model/Vendedor';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {VendedorTableComponent} from './vendedor-table/vendedor-table.component';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})export class VendedorComponent implements OnInit {

  @ViewChild (VendedorTableComponent , {static: false}) vendedorTableComponent: VendedorTableComponent;

  botonAgregar = 'Agregar Vendedor';
  titulo = 'Vendedores';
  tituloFormulario = 'Vendedor';
  vendedor: Vendedor = new Vendedor();

  constructor(private dialog: MatDialog,
              private vendedorService: VendedorService,
              private coreService: CoreService) { }

  ngOnInit() {}

  agregar() {
    this.vendedor = new Vendedor();
    this.vendedorService.vendedorTable = false;
  }

  closeCRUD() {
    this.vendedorService.vendedorTable = true;
  }

  onFormSubmit() {
    if (this.vendedorService.vendedor) {
      console.log(this.vendedorService.vendedor);
      if (this.vendedorService.vendedor.id) {
        this.vendedorService
          .updateVendedor(this.vendedorService.vendedor.id, this.vendedorService.vendedor)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Vendedor Actualizado');
              this.vendedorService.vendedorTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.vendedorService.saveVendedor(this.vendedorService.vendedor).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Vendedor Agregado');
            this.vendedorTableComponent.getVendedores();
            this.vendedorService.vendedorTable = true;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
