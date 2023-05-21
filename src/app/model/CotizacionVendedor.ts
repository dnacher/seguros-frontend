import {Producto} from './Producto';
import {Vendedor} from './Vendedor';

export class CotizacionVendedor {
  id: number;
  uuid: number;
  producto: Producto;
  vendedor: Vendedor;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaInicio: Date;
  fechaFin: Date;
}
