import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../service/usuario.service';
import {Usuario} from '../../model/Usuario';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})export class UsuarioComponent implements OnInit {

  botonAgregar = 'Agregar Usuario';
  titulo = 'Usuarios';
  tituloFormulario = 'Usuario';
  usuario: Usuario = new Usuario();
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
              private usuarioService: UsuarioService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  agregar() {
    this.usuario = new Usuario();
    this.displayTable = false;
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
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

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuarioById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Usuario Eliminado', 'done');
        this.getUsuarios();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.usuario = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.usuario) {
      console.log(this.usuario);
      if (this.usuario.id) {
        this.usuarioService
          .updateUsuario(this.usuario.id, this.usuario)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Usuario Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.usuarioService.saveUsuario(this.usuario).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Usuario Agregado');
            this.getUsuarios();
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
