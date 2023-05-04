import {Compania} from './Compania';
import {TipoProducto} from './TipoProducto';

export interface Producto {
  id: number;
  uuid: string;
  nombre: string;
  descripcion: string;
  compania: Compania;
  tipoProducto: TipoProducto;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaComienzo: Date;
  fechaFinal: Date;
}
