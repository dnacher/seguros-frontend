import {TipoUsuario} from './TipoUsuario';

export class PermisoUsuario {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  tipoUsuario: TipoUsuario;
  pagina: string;
  permiso: number;
}
