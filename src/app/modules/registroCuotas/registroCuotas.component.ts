import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistroCuotasService} from '../../service/registroCuotas.service';
import {RegistroCuotas} from '../../model/RegistroCuotas';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-registro-cuotas',
  templateUrl: './registroCuotas.component.html',
  styleUrls: ['./registroCuotas.component.scss']
})export class RegistroCuotasComponent implements OnInit {

  botonAgregar = 'Agregar Registro Cuotas';
  titulo = 'Registro Cuotas';
  tituloFormulario = 'Registro Cuotas';
  registroCuotas: RegistroCuotas = new RegistroCuotas();
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
              private registroCuotasService: RegistroCuotasService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getRegistroCuotass();
  }

  agregar() {
    this.registroCuotas = new RegistroCuotas();
    this.displayTable = false;
  }

  getRegistroCuotass() {
    this.registroCuotasService.getRegistroCuotas().subscribe({
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

  deleteRegistroCuotas(id: number) {
    this.registroCuotasService.deleteRegistroCuotasById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Registro Cuotas Eliminado', 'done');
        this.getRegistroCuotass();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.registroCuotas = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.registroCuotas) {
      console.log(this.registroCuotas);
      if (this.registroCuotas.id) {
        this.registroCuotasService
          .updateRegistroCuotas(this.registroCuotas.id, this.registroCuotas)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Registro Cuotas Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.registroCuotasService.saveRegistroCuotas(this.registroCuotas).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Registro Cuotas Agregado');
            this.getRegistroCuotass();
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
