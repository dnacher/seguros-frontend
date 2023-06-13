import {Compania} from './Compania';
import {TipoProducto} from './TipoProducto';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Producto extends AbstractDomainEntity {
  id: number;
  nombre: string;
  descripcion: string;
  compania: Compania;
  tipoProducto: TipoProducto;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaComienzo: Date;
  fechaFinal: Date;
}
