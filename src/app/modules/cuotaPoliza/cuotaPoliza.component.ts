import {Component, OnInit, ViewChild} from '@angular/core';
import {CuotaPolizaService} from '../../service/cuotaPoliza.service';
import {CuotaPoliza} from '../../model/CuotaPoliza';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-cuota-polizas',
  templateUrl: './cuotaPoliza.component.html',
  styleUrls: ['./cuotaPoliza.component.scss']
})export class CuotaPolizaComponent implements OnInit {

  botonAgregar = 'Agregar Cuota Poliza';
  titulo = 'Cuota Polizas';
  tituloFormulario = 'Cuota Poliza';
  cuotaPoliza: CuotaPoliza = new CuotaPoliza();
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
              private cuotaPolizaService: CuotaPolizaService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getCuotaPolizas();
  }

  agregar() {
    this.cuotaPoliza = new CuotaPoliza();
    this.displayTable = false;
  }

  getCuotaPolizas() {
    this.cuotaPolizaService.getCuotaPoliza().subscribe({
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

  deleteCuotaPoliza(id: number) {
    this.cuotaPolizaService.deleteCuotaPolizaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Cuota Poliza Eliminado', 'done');
        this.getCuotaPolizas();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.cuotaPoliza = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.cuotaPoliza) {
      console.log(this.cuotaPoliza);
      if (this.cuotaPoliza.id) {
        this.cuotaPolizaService
          .updateCuotaPoliza(this.cuotaPoliza.id, this.cuotaPoliza)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Cuota Poliza Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.cuotaPolizaService.saveCuotaPoliza(this.cuotaPoliza).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Cuota Poliza Agregado');
            this.getCuotaPolizas();
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
