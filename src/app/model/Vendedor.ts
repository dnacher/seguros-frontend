export interface Vendedor {
  id: number;
  uuid: string;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  fechaNacimiento: Date;
  celular: string;
  email: string;
  activo: boolean;
}
