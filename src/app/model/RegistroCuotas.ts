import {Poliza} from './Poliza';

export class RegistroCuotas {
  id: number;
  uuid: string;
  poliza: Poliza;
  numeroCuotasPagas: number;
  ultimaFechaActualizacion: Date;
}
