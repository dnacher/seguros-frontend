import {AbstractDomainEntity} from './AbstractDomainEntity';

export class EstadoPoliza extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
}
