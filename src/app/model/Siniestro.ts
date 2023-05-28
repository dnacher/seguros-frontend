import {Cliente} from './Cliente';
import {Poliza} from './Poliza';
import {EstadoSiniestro} from './EstadoSiniestro';

export class Siniestro {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  cliente: Cliente;
  numeroSiniestro: string;
  poliza: Poliza;
  fecha: Date;
  esDeducible: boolean;
  importeDeducible: number;
  estadoSiniestro: EstadoSiniestro;
  informacion: string;

}
