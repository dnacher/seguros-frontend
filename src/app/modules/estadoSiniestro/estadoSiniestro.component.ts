import {Component, OnInit, ViewChild} from '@angular/core';
import {EstadoSiniestroService} from '../../service/estadoSiniestro.service';
import {EstadoSiniestro} from '../../model/EstadoSiniestro';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-estado-siniestros',
  templateUrl: './estadoSiniestro.component.html',
  styleUrls: ['./estadoSiniestro.component.scss']
})export class EstadoSiniestroComponent implements OnInit {

  botonAgregar = 'Agregar Estado Siniestro';
  titulo = 'Estado Siniestros';
  tituloFormulario = 'Estado Siniestro';
  estadoSiniestro: EstadoSiniestro = new EstadoSiniestro();
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
              private estadoSiniestroService: EstadoSiniestroService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getEstadoSiniestros();
  }

  agregar() {
    this.estadoSiniestro = new EstadoSiniestro();
    this.displayTable = false;
  }

  getEstadoSiniestros() {
    this.estadoSiniestroService.getEstadoSiniestro().subscribe({
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

  deleteEstadoSiniestro(id: number) {
    this.estadoSiniestroService.deleteEstadoSiniestroById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Estado Siniestro Eliminado', 'done');
        this.getEstadoSiniestros();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.estadoSiniestro = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.estadoSiniestro) {
      console.log(this.estadoSiniestro);
      if (this.estadoSiniestro.id) {
        this.estadoSiniestroService
          .updateEstadoSiniestro(this.estadoSiniestro.id, this.estadoSiniestro)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Estado Siniestro Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.estadoSiniestroService.saveEstadoSiniestro(this.estadoSiniestro).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Estado Siniestro Agregado');
            this.getEstadoSiniestros();
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
