import {Component, OnInit, ViewChild} from '@angular/core';
import {PolizaService} from '../../service/poliza.service';
import {Poliza} from '../../model/Poliza';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-polizas',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.scss']
})export class PolizaComponent implements OnInit {

  botonAgregar = 'Agregar Poliza';
  titulo = 'Polizas';
  tituloFormulario = 'Poliza';
  poliza: Poliza = new Poliza();
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
              private polizaService: PolizaService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getPolizas();
  }

  agregar() {
    this.poliza = new Poliza();
    this.displayTable = false;
  }

  getPolizas() {
    this.polizaService.getPolizas().subscribe({
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

  deletePoliza(id: number) {
    this.polizaService.deletePolizaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Poliza Eliminado', 'done');
        this.getPolizas();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.poliza = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.poliza) {
      console.log(this.poliza);
      if (this.poliza.id) {
        this.polizaService
          .updatePoliza(this.poliza.id, this.poliza)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Poliza Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.polizaService.savePoliza(this.poliza).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Poliza Agregado');
            this.getPolizas();
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
