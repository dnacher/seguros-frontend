import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingreso} from '../../model/Ingreso';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {IngresosService} from '../../service/ingreso.service';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})export class IngresoComponent implements OnInit {

  botonAgregar = 'Agregar Ingreso';
  titulo = 'Ingresos';
  tituloFormulario = 'Ingreso';
  ingreso: Ingreso = new Ingreso();
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
              private ingresoService: IngresosService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getIngresos();
  }

  agregar() {
    this.ingreso = new Ingreso();
    this.displayTable = false;
  }

  getIngresos() {
    this.ingresoService.getIngresos().subscribe({
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

  deleteIngreso(id: number) {
    this.ingresoService.deleteIngresoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Ingreso Eliminado', 'done');
        this.getIngresos();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.ingreso = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.ingreso) {
      console.log(this.ingreso);
      if (this.ingreso.id) {
        this.ingresoService
          .updateIngreso(this.ingreso.id, this.ingreso)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Ingreso Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.ingresoService.saveIngreso(this.ingreso).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Ingreso Agregado');
            this.getIngresos();
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
