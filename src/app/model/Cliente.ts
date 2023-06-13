import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Cliente extends AbstractDomainEntity {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  fechaNacimiento: Date;
  telefono: string;
  celular: string;
  email: string;
  cedulaIdentidad: string;
  libretaPropiedad: string;
  recomendadoPor: Cliente;
  fechaComienzo: Date;
  rut: string;
  observaciones: string;
  activo: boolean;
}
