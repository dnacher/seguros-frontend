import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CompaniasService} from '../../../service/compania.service';
import {CoreService} from '../../../service/core.service';
import {MatSort} from '@angular/material';
import {ProductoService} from '../../../service/producto.service';

@Component({
  selector: 'app-companias-tabla',
  templateUrl: './companias-tabla.component.html',
  styleUrls: ['./companias-tabla.component.scss']
})
export class CompaniasTablaComponent implements OnInit {

  displayedColumns: string[] = [
    'uuid',
    'nombre',
    'descripcion',
    'email',
    'telfono',
    'web',
    'numeroAuxilio',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static : false}) sort!: MatSort;

  constructor(private companiaService: CompaniasService,
              private productoService: ProductoService,
              private coreService: CoreService) { }

  getCompanias() {
    this.companiaService.getCompanias().subscribe({
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

  deleteCompania(id: number) {
    this.companiaService.deleteCompaniaById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Compañia Eliminada', 'done');
        this.getCompanias();
      },
      error: console.log,
    });
  }

  ngOnInit(): void {
    this.getCompanias();
  }

  openEditForm(data: any) {
    this.companiaService.compania = data;
    this.mostrarFormulario();
  }

  mostrarFormulario() {
    this.companiaService.companiaTable = false;
    this.companiaService.action = false;
  }

  setCompania(row) {
    this.companiaService.compania = row;
    this.companiaService.companiaTable = false;
    this.productoService.panelCRUD = true;
  }

}
