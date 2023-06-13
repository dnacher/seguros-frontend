import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Banco extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
}
