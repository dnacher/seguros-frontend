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
  nombreRecomendado = '';
  displayedColumnsRecomendado: string[] = [
    'nombre',
    'direccion',
    'ciudad',
    'departamento',
    'telefono',
    'action',
  ];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'ciudad',
    'departamento',
    'fechaNacimiento',
    'telefono',
    'action',
  ];
  panelTable = true;
  panelRecomendado = false;
  panelCRUD = false;
  dataSource!: MatTableDataSource<any>;
  dataSourceRecomendado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginatorRecomnedado!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sortRecomendado!: MatSort;


  constructor(private dialog: MatDialog,
              private clienteService: ClientesService,
              private coreService: CoreService) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.getClientes();
    this.mostrarTabla();
  }

  agregar() {
    this.cliente = new Cliente();
    this.mostrarCRUD();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSourceRecomendado = new MatTableDataSource(res);
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
    this.mostrarCRUD();
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
              this.mostrarTabla();
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
            this.mostrarTabla();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  closeCRUD() {
    this.mostrarTabla();
  }

  mostrarCRUD() {
    this.panelRecomendado = false;
    this.panelTable = false;
    this.panelCRUD = true;
  }

  mostrarRecomendados() {
    console.log(this.dataSourceRecomendado.data.length);
    this.panelRecomendado = true;
    this.panelTable = false;
    this.panelCRUD = false;
  }

  mostrarTabla() {
    this.panelRecomendado = false;
    this.panelTable = true;
    this.panelCRUD = false;
  }

  setRecomendado(row) {
    this.cliente.recomendadoPor = row;
    this.nombreRecomendado = this.getRecomendadoPor();
    this.mostrarCRUD();
  }

  getRecomendadoPor() {
    if (this.cliente.recomendadoPor) {
      return this.cliente.recomendadoPor.nombre + ' ' + this.cliente.recomendadoPor.apellido;
    } else {
      return '';
    }
  }

}
