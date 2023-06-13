import {Poliza} from './Poliza';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class CuotaPoliza extends AbstractDomainEntity {
  id: number;
  poliza: Poliza;
  numeroCuota: number;
  fechaRegistrado: Date;
}
