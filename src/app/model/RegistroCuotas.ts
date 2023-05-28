import {Poliza} from './Poliza';

export class RegistroCuotas {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  poliza: Poliza;
  numeroCuotasPagas: number;
  ultimaFechaActualizacion: Date;
}
