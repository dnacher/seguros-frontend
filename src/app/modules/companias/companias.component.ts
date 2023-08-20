import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {Compania} from '../../model/Compania';
import {CompaniasService} from '../../service/compania.service';
import {CompaniasTablaComponent} from './companias-tabla/companias-tabla.component';

@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.scss']
})export class CompaniasComponent implements OnInit {

  botonAgregar = 'Agregar Compañia';
  titulo = 'Compañias';
  tituloFormulario = 'Compañia';

  constructor(private dialog: MatDialog,
              private companiaService: CompaniasService,
              private coreService: CoreService) { }

  @ViewChild (CompaniasTablaComponent, {static: false}) companiaTable: CompaniasTablaComponent;

  ngOnInit() {
    this.companiaService.compania = new Compania();
    this.mostrarTabla();
  }

  agregar() {
    this.companiaService.compania = new Compania();
    this.companiaService.companiaTable = false;
  }

  onFormSubmit() {
    if (this.companiaService.compania) {
      console.log(this.companiaService.compania);
      if (this.companiaService.compania.id) {
        this.companiaService
          .updateCompania(this.companiaService.compania.id, this.companiaService.compania)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Compañia Actualizada');
              this.closeCRUD();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.companiaService.saveCompania(this.companiaService.compania).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Compañia Agregada');
            this.companiaTable.getCompanias();
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
    this.companiaService.companiaTable = true;
    this.companiaService.action = false;
  }

  mostrarTabla() {
    this.companiaService.companiaTable = true;
    this.companiaService.action = false;
  }
}
