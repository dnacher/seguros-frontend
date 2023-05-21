import {TipoUsuario} from './TipoUsuario';

export class Usuario {
  id: number;
  uuid: string;
  nombre: string;
  password: string;
  tipoUsuario: TipoUsuario;
  activo: boolean;
}
