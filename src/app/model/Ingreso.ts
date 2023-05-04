import {Banco} from './Banco';

export interface Ingreso {
  id: number;
  uuid: string;
  mes: number;
  anio: number;
  banco: Banco;
  valor: number;
}
