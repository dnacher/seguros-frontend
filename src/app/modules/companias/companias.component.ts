import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {Compania} from '../../model/Compania';
import {CompaniasService} from '../../service/compania..service';

@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.scss']
})export class CompaniasComponent implements OnInit {

  botonAgregar = 'Agregar Compañia';
  titulo = 'Compañias';
  tituloFormulario = 'Compañia';
  compania: Compania = new Compania();
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
              private companiaService: CompaniasService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getCompanias();
  }

  agregar() {
    this.compania = new Compania();
    this.displayTable = false;
  }

  getCompanias() {
    this.companiaService.getCompanias().subscribe({
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

  deleteCompania(id: number) {
    this.companiaService.deleteCompaniaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Compañia Eliminada', 'done');
        this.getCompanias();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.compania = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.compania) {
      console.log(this.compania);
      if (this.compania.id) {
        this.companiaService
          .updateCompania(this.compania.id, this.compania)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Compañia Actualizada');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.companiaService.saveCompania(this.compania).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Compañia Agregada');
            this.getCompanias();
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
