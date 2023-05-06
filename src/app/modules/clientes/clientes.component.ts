import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientesService} from '../../service/cliente.service';
import {Cliente} from '../../model/Cliente';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CoreService} from '../../service/core.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})export class ClienteComponent implements OnInit {

  botonAgregar = 'Agregar Cliente';
  titulo = 'Clientes';
  cliente: Cliente = new Cliente();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'direccion',
    'ciudad',
    'departamento',
    'fechaNacimiento',
    'telefono',
    'action',
  ];
  displayTable = true;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;


  constructor(private dialog: MatDialog,
              private clienteService: ClientesService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.getClientes();
  }

  agregar() {
    this.cliente = new Cliente();
    this.displayTable = false;
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
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

  deleteCliente(id: number) {
    this.clienteService.deleteClienteById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Cliente Eliminado', 'done');
        this.getClientes();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.cliente = data;
    this.displayTable = false;
  }

  onFormSubmit() {
    if (this.cliente) {
      console.log(this.cliente);
      if (this.cliente.id) {
        this.clienteService
          .updateCliente(this.cliente.id, this.cliente)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Cliente Actualizado');
              this.displayTable = true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.clienteService.saveCliente(this.cliente).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Cliente Agregado');
            this.getClientes();
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
