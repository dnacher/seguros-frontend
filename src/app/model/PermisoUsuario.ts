import {TipoUsuario} from './TipoUsuario';

export interface PermisoUsuario {
  id: number;
  uuid: string;
  tipoUsuario: TipoUsuario;
  pagina: string;
  permiso: number;
}
