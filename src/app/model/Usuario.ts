import {TipoUsuario} from './TipoUsuario';

export class Usuario {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  nombre: string;
  password: string;
  tipoUsuario: TipoUsuario;
  activo: boolean;
}
