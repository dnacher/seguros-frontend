import { Component, OnInit } from '@angular/core';
import {BancosService} from '../../service/bancos.service';
import {Banco} from '../../model/Banco';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})export class BancosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion'];
  bancos: Banco[];
  constructor(private bancoService: BancosService) { }

  loadData(){
    this.bancoService.getBancos().subscribe(
      bancos => {
        this.bancos = bancos;
      });
  }

  ngOnInit() {
    this.loadData();
  }

}
