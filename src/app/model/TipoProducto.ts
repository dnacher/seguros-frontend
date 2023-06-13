import {AbstractDomainEntity} from './AbstractDomainEntity';

export class TipoProducto extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
}
