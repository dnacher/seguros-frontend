import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Moneda extends AbstractDomainEntity {
  id: number;
  nombre: string;
  simbolo: string;
}
