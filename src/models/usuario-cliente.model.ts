import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_usuario_id_cliente: {
        name: 'fk_usuario_id_cliente',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'id_cliente',
      }
    },
  },
})
export class UsuarioCliente extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'number',
  })
  id_cliente?: number;

  constructor(data?: Partial<UsuarioCliente>) {
    super(data);
  }
}

export interface UsuarioClienteRelations {
  // describe navigational properties here
}

export type UsuarioClienteWithRelations = UsuarioCliente & UsuarioClienteRelations;
