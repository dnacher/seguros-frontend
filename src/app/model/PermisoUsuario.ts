import {TipoUsuario} from './TipoUsuario';

export class PermisoUsuario {
  id: number;
  uuid: string;
  tipoUsuario: TipoUsuario;
  pagina: string;
  permiso: number;
}
