import {AbstractDomainEntity} from './AbstractDomainEntity';

export class EstadoSiniestro extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
}
