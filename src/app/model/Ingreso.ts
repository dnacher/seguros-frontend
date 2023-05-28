import {Banco} from './Banco';

export class Ingreso {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  mes: number;
  anio: number;
  banco: Banco;
  valor: number;
}
