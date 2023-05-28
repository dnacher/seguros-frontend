import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoUsuarioService} from '../../service/tipoUsuario.service';
import {TipoUsuario} from '../../model/TipoUsuario';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipoUsuario.component.html',
  styleUrls: ['./tipoUsuario.component.scss']
})export class TipoUsuarioComponent implements OnInit {

  botonAgregar = 'Agregar TipoUsuario';
  titulo = 'TipoUsuarios';
  tituloFormulario = 'TipoUsuario';
  tipoUsuario: TipoUsuario = new TipoUsuario();
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
              private tipoUsuarioService: TipoUsuarioService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getTipoUsuarios();
  }

  agregar() {
    this.tipoUsuario = new TipoUsuario();
    this.displayTable = false;
  }

  getTipoUsuarios() {
    this.tipoUsuarioService.getTipoUsuarios().subscribe({
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

  deleteTipoUsuario(id: number) {
    this.tipoUsuarioService.deleteTipoUsuarioById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('TipoUsuario Eliminado', 'done');
        this.getTipoUsuarios();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.tipoUsuario = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.tipoUsuario) {
      console.log(this.tipoUsuario);
      if (this.tipoUsuario.id) {
        this.tipoUsuarioService
          .updateTipoUsuario(this.tipoUsuario.id, this.tipoUsuario)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('TipoUsuario Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.tipoUsuarioService.saveTipoUsuario(this.tipoUsuario).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('TipoUsuario Agregado');
            this.getTipoUsuarios();
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
