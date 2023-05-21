import {Banco} from './Banco';

export class Ingreso {
  id: number;
  uuid: string;
  mes: number;
  anio: number;
  banco: Banco;
  valor: number;
}
