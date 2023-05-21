import {Cliente} from './Cliente';
import {Poliza} from './Poliza';
import {EstadoSiniestro} from './EstadoSiniestro';

export class Siniestro {
  id: number;
  uuid: string;
  cliente: Cliente;
  numeroSiniestro: string;
  poliza: Poliza;
  fecha: Date;
  esDeducible: boolean;
  importeDeducible: number;
  estadoSiniestro: EstadoSiniestro;
  informacion: string;

}
