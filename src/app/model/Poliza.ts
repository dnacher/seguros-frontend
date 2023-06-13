import {Compania} from './Compania';
import {Cliente} from './Cliente';
import {Producto} from './Producto';
import {TipoProducto} from './TipoProducto';
import {Moneda} from './Moneda';
import {FormaPago} from './FormaPago';
import {EstadoPoliza} from './EstadoPoliza';
import {CotizacionVendedor} from './CotizacionVendedor';
import {RegistroCuotas} from './RegistroCuotas';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Poliza extends AbstractDomainEntity {
  id: number;
  compania: Compania;
  cliente: Cliente;
  numeroPoliza: string;
  comienzo: Date;
  vencimiento: Date;
  producto: Producto;
  tipoProducto: TipoProducto;
  premio: number;
  prima: number;
  moneda: Moneda;
  comisionPorcentaje: number;
  comisionValor: number;
  comisionVendedorPorcentaje: number;
  comisionVendedorValor: number;
  formaPago: FormaPago;
  cuotas: number;
  comienzoCuota: Date;
  finCuota: Date;
  importeCuota: number;
  cerradoPor: string;
  esApp: boolean;
  estado: EstadoPoliza;
  vendedor: CotizacionVendedor;
  polizaMadre: Poliza;
  observaciones: string;
  registroCuotas: RegistroCuotas;
}
