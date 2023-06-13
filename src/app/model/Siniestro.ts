import {Cliente} from './Cliente';
import {Poliza} from './Poliza';
import {EstadoSiniestro} from './EstadoSiniestro';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class Siniestro extends AbstractDomainEntity {
  id: number;
  cliente: Cliente;
  numeroSiniestro: string;
  poliza: Poliza;
  fecha: Date;
  esDeducible: boolean;
  importeDeducible: number;
  estadoSiniestro: EstadoSiniestro;
  informacion: string;

}
