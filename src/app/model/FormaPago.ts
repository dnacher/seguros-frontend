import {AbstractDomainEntity} from './AbstractDomainEntity';

export class FormaPago extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
}
