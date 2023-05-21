import {Component, OnInit, ViewChild} from '@angular/core';
import {Moneda} from '../../model/Moneda';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {MonedasService} from '../../service/moneda.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})export class MonedaComponent implements OnInit {

  botonAgregar = 'Agregar Moneda';
  titulo = 'Monedas';
  tituloFormulario = 'Moneda';
  moneda: Moneda = new Moneda();
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
              private monedaService: MonedasService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getMonedas();
  }

  agregar() {
    this.moneda = new Moneda();
    this.displayTable = false;
  }

  getMonedas() {
    this.monedaService.getMonedas().subscribe({
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

  deleteMoneda(id: number) {
    this.monedaService.deleteMonedaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Moneda Eliminado', 'done');
        this.getMonedas();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.moneda = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.moneda) {
      console.log(this.moneda);
      if (this.moneda.id) {
        this.monedaService
          .updateMoneda(this.moneda.id, this.moneda)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Moneda Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.monedaService.saveMoneda(this.moneda).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Moneda Agregado');
            this.getMonedas();
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
