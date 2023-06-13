import {Poliza} from './Poliza';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class RegistroCuotas extends AbstractDomainEntity {
  id: number;
  poliza: Poliza;
  numeroCuotasPagas: number;
  ultimaFechaActualizacion: Date;
}
