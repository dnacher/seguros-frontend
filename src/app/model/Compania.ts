import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Compania extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
  email: string;
  telfono: string;
  web: string;
  numeroAuxilio: string;
}
