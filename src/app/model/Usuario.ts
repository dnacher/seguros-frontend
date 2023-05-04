import {TipoUsuario} from './TipoUsuario';

export interface Usuario {
  id: number;
  uuid: string;
  nombre: string;
  password: string;
  tipoUsuario: TipoUsuario;
  activo: boolean;
}
