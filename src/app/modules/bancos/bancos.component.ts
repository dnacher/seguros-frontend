import {Component, OnInit, ViewChild} from '@angular/core';
import {BancoService} from '../../service/banco.service';
import {Banco} from '../../model/Banco';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})export class BancosComponent implements OnInit {

  botonAgregar = 'Agregar Banco';
  titulo = 'Bancos';
  tituloFormulario = 'Banco';
  banco: Banco = new Banco();
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
              private bancoService: BancoService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getBancos();
  }

  agregar() {
    this.banco = new Banco();
    this.displayTable = false;
  }

  getBancos() {
    this.bancoService.getBancos().subscribe({
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

  deleteBanco(id: number) {
    this.bancoService.deleteBancoById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Banco Eliminado', 'done');
        this.getBancos();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.banco = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.banco) {
      console.log(this.banco);
      if (this.banco.id) {
        this.bancoService
          .updateBanco(this.banco.id, this.banco)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Banco Actualizado');
              this.getBancos();
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.bancoService.saveBanco(this.banco).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Banco Agregado');
            this.getBancos();
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
