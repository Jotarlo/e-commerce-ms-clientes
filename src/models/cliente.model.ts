import {Entity, hasOne, model, property} from '@loopback/repository';
import {DireccionCliente} from './direccion-cliente.model';
import {UsuarioCliente} from './usuario-cliente.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @hasOne(() => DireccionCliente, {keyTo: 'id_cliente'})
  direccionCliente: DireccionCliente;

  @hasOne(() => UsuarioCliente, {keyTo: 'id_cliente'})
  usuarioCliente: UsuarioCliente;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
