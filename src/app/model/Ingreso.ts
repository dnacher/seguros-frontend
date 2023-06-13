import {Banco} from './Banco';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Ingreso extends AbstractDomainEntity {
  id: number;
  mes: number;
  anio: number;
  banco: Banco;
  valor: number;
}
