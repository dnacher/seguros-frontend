import {Compania} from './Compania';
import {TipoProducto} from './TipoProducto';

export class Producto {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  nombre: string;
  descripcion: string;
  compania: Compania;
  tipoProducto: TipoProducto;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaComienzo: Date;
  fechaFinal: Date;
}
