import {Component, OnInit, ViewChild} from '@angular/core';
import {EstadoPolizaService} from '../../service/estadoPoliza.service';
import {EstadoPoliza} from '../../model/EstadoPoliza';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-estado-polizas',
  templateUrl: './estadoPoliza.component.html',
  styleUrls: ['./estadoPoliza.component.scss']
})export class EstadoPolizaComponent implements OnInit {

  botonAgregar = 'Agregar Estado Poliza';
  titulo = 'Estado Polizas';
  tituloFormulario = 'Estado Poliza';
  estadoPoliza: EstadoPoliza = new EstadoPoliza();
  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'descripcion',
    'action',
  ];
  displayTable = true;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;


  constructor(private dialog: MatDialog,
              private estadoPolizaService: EstadoPolizaService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getEstadoPolizas();
  }

  agregar() {
    this.estadoPoliza = new EstadoPoliza();
    this.displayTable = false;
  }

  getEstadoPolizas() {
    this.estadoPolizaService.getEstadoPoliza().subscribe({
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

  deleteEstadoPoliza(id: number) {
    this.estadoPolizaService.deleteEstadoPolizaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Estado Poliza Eliminado', 'done');
        this.getEstadoPolizas();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.estadoPoliza = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.estadoPoliza) {
      console.log(this.estadoPoliza);
      if (this.estadoPoliza.id) {
        this.estadoPolizaService
          .updateEstadoPoliza(this.estadoPoliza.id, this.estadoPoliza)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Estado Poliza Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.estadoPolizaService.saveEstadoPoliza(this.estadoPoliza).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Estado Poliza Agregado');
            this.getEstadoPolizas();
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
