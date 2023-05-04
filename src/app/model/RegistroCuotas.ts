import {Poliza} from './Poliza';

export interface RegistroCuotas {
  id: number;
  uuid: string;
  poliza: Poliza;
  numeroCuotasPagas: number;
  ultimaFechaActualizacion: Date;
}
