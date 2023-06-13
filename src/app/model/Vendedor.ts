import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Vendedor extends AbstractDomainEntity {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  fechaNacimiento: Date;
  celular: string;
  email: string;
  activo: boolean;
}
