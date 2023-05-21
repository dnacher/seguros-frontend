import {Component, OnInit, ViewChild} from '@angular/core';
import {PermisoUsuarioService} from '../../service/permisoUsuario.service';
import {PermisoUsuario} from '../../model/PermisoUsuario';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-permiso-usuario',
  templateUrl: './permisoUsuario.component.html',
  styleUrls: ['./permisoUsuario.component.scss']
})export class PermisoUsuarioComponent implements OnInit {

  botonAgregar = 'Agregar Permiso Usuario';
  titulo = 'Permiso Usuarios';
  tituloFormulario = 'Permiso Usuario';
  permisoUsuario: PermisoUsuario = new PermisoUsuario();
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
              private permisoUsuarioService: PermisoUsuarioService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getPermisoUsuarios();
  }

  agregar() {
    this.permisoUsuario = new PermisoUsuario();
    this.displayTable = false;
  }

  getPermisoUsuarios() {
    this.permisoUsuarioService.getPermisoUsuarios().subscribe({
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

  deletePermisoUsuario(id: number) {
    this.permisoUsuarioService.deletePermisoUsuarioById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Permiso Usuario Eliminado', 'done');
        this.getPermisoUsuarios();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.permisoUsuario = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.permisoUsuario) {
      console.log(this.permisoUsuario);
      if (this.permisoUsuario.id) {
        this.permisoUsuarioService
          .updatePermisoUsuario(this.permisoUsuario.id, this.permisoUsuario)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Permiso Usuario Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.permisoUsuarioService.savePermisoUsuario(this.permisoUsuario).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Permiso Usuario Agregado');
            this.getPermisoUsuarios();
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
