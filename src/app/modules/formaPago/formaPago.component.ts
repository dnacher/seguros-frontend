import {Component, OnInit, ViewChild} from '@angular/core';
import {FormaPago} from '../../model/FormaPago';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {FormaPagoService} from '../../service/formaPagos..service';

@Component({
  selector: 'app-forma-pagos',
  templateUrl: './formaPago.component.html',
  styleUrls: ['./formaPago.component.scss']
})export class FormaPagoComponent implements OnInit {

  botonAgregar = 'Agregar Forma Pago';
  titulo = 'Forma Pagos';
  tituloFormulario = 'Forma Pago';
  formaPago: FormaPago = new FormaPago();
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
              private formaPagoService: FormaPagoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getFormaPagos();
  }

  agregar() {
    this.formaPago = new FormaPago();
    this.displayTable = false;
  }

  getFormaPagos() {
    this.formaPagoService.getFormaPago().subscribe({
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

  deleteFormaPago(id: number) {
    this.formaPagoService.deleteFormaPagoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Forma Pago Eliminado', 'done');
        this.getFormaPagos();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.formaPago = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.formaPago) {
      console.log(this.formaPago);
      if (this.formaPago.id) {
        this.formaPagoService
          .updateFormaPago(this.formaPago.id, this.formaPago)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Forma Pago Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.formaPagoService.saveFormaPago(this.formaPago).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Forma Pago Agregado');
            this.getFormaPagos();
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
