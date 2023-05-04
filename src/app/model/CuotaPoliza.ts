import {Poliza} from './Poliza';

export interface CuotaPoliza {
  id: number;
  uuid: string;
  poliza: Poliza;
  numeroCuota: number;
  fechaRegistrado: Date;
}
