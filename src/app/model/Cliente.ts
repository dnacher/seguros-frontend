export class Cliente {
  id: number;
  uuid: string;
  created: Date;
  updated: Date;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  fechaNacimiento: Date;
  telefono: string;
  celular: string;
  email: string;
  cedulaIdentidad: string;
  libretaPropiedad: string;
  recomendadoPor: Cliente;
  fechaComienzo: Date;
  rut: string;
  observaciones: string;
  activo: boolean;
}
