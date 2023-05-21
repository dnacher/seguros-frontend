import {Component, OnInit, ViewChild} from '@angular/core';
import {SiniestroService} from '../../service/siniestro.service';
import {Siniestro} from '../../model/Siniestro';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-siniestros',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.scss']
})export class SiniestroComponent implements OnInit {

  botonAgregar = 'Agregar Siniestro';
  titulo = 'Siniestros';
  tituloFormulario = 'Siniestro';
  siniestro: Siniestro = new Siniestro();
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
              private siniestroService: SiniestroService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getSiniestros();
  }

  agregar() {
    this.siniestro = new Siniestro();
    this.displayTable = false;
  }

  getSiniestros() {
    this.siniestroService.getSiniestros().subscribe({
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

  deleteSiniestro(id: number) {
    this.siniestroService.deleteSiniestroById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Siniestro Eliminado', 'done');
        this.getSiniestros();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.siniestro = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.siniestro) {
      console.log(this.siniestro);
      if (this.siniestro.id) {
        this.siniestroService
          .updateSiniestro(this.siniestro.id, this.siniestro)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Siniestro Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.siniestroService.saveSiniestro(this.siniestro).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Siniestro Agregado');
            this.getSiniestros();
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
