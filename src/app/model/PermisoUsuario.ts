import {TipoUsuario} from './TipoUsuario';

export interface EstadoPoliza {
  id: number;
  uuid: string;
  tipoUsuario: TipoUsuario;
  pagina: string;
  permiso: number;
}
