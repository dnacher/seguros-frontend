import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../service/usuario.service';
import {Usuario} from '../../model/Usuario';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ErrorStateMatcher, MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';
import {TipoUsuarioService} from '../../service/tipoUsuario.service';
import {TipoUsuario} from '../../model/TipoUsuario';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})export class UsuarioComponent implements OnInit {

  botonAgregar = 'Agregar Usuario';
  titulo = 'Usuarios';
  tituloFormulario = 'Usuario';
  usuario: Usuario = new Usuario();
  tipoUsuario: TipoUsuario = new TipoUsuario();
  pass = '';
  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'tipoUsuario',
    'action',
  ];
  matcher = new MyErrorStateMatcher();
  displayTable = true;
  usuarios!: MatTableDataSource<any>;
  tipoUsuarioList!: TipoUsuario[];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;


  constructor(private dialog: MatDialog,
              private usuarioService: UsuarioService,
              private coreService: CoreService,
              private tipoUsuarioService: TipoUsuarioService) { }

ngOnInit() {
    this.getTipoUsuarios();
    this.getUsuarios();
  }

  agregar() {
    this.usuario = new Usuario();
    this.displayTable = false;
  }

  getTipoUsuarios() {
    this.tipoUsuarioService.getTipoUsuarios().subscribe({
      next: (res) => {
        this.tipoUsuarioList = res;
      },
      error: console.log,
    });
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = new MatTableDataSource(res);
        this.usuarios.sort = this.sort;
        this.usuarios.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();

    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
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
        if (this.usuario.tipoUsuario == null) {
          if (this.tipoUsuario != null) {
            this.usuario.tipoUsuario = this.tipoUsuario;
            if (this.usuario.password === this.pass) {
              this.usuarioService.saveUsuario(this.usuario).subscribe({
                next: () => {
                  this.coreService.openSnackBar('Usuario Agregado');
                  this.getUsuarios();
                  this.displayTable = true;
                },
                error: (err: any) => {
                  console.error(err);
                },
              });
            } else {
              this.coreService.openSnackBar('El password no coincide');
            }

          } else {
            this.coreService.openSnackBar('Debe ingresar un tipo de usuario');
          }
        }
      }
    }
  }

  closeCRUD() {
    this.displayTable = true;
  }

}
