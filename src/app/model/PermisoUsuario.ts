import {TipoUsuario} from './TipoUsuario';
import {AbstractDomainEntity} from './AbstractDomainEntity';

export class PermisoUsuario extends AbstractDomainEntity {
  id: number;
  tipoUsuario: TipoUsuario;
  pagina: string;
  permiso: number;
}
