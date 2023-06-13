import {Producto} from './Producto';
import {Vendedor} from './Vendedor';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class CotizacionVendedor extends AbstractDomainEntity {
  id: number;
  producto: Producto;
  vendedor: Vendedor;
  comisionNueva: number;
  comisionRenovacion: number;
  fechaInicio: Date;
  fechaFin: Date;
}
