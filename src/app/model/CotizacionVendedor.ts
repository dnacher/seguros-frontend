import {Producto} from './Producto';
import {Vendedor} from './Vendedor';

export class CotizacionVendedor {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  producto: Producto;
  vendedor: Vendedor;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaInicio: Date;
  fechaFin: Date;
}
