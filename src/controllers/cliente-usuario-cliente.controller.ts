import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  UsuarioCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteUsuarioClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/usuario-cliente', {
    responses: {
      '200': {
        description: 'Cliente has one UsuarioCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioCliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioCliente>,
  ): Promise<UsuarioCliente> {
    return this.clienteRepository.usuarioCliente(id).get(filter);
  }

  @post('/clientes/{id}/usuario-cliente', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCliente, {
            title: 'NewUsuarioClienteInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) usuarioCliente: Omit<UsuarioCliente, 'id'>,
  ): Promise<UsuarioCliente> {
    return this.clienteRepository.usuarioCliente(id).create(usuarioCliente);
  }

  @patch('/clientes/{id}/usuario-cliente', {
    responses: {
      '200': {
        description: 'Cliente.UsuarioCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCliente, {partial: true}),
        },
      },
    })
    usuarioCliente: Partial<UsuarioCliente>,
    @param.query.object('where', getWhereSchemaFor(UsuarioCliente)) where?: Where<UsuarioCliente>,
  ): Promise<Count> {
    return this.clienteRepository.usuarioCliente(id).patch(usuarioCliente, where);
  }

  @del('/clientes/{id}/usuario-cliente', {
    responses: {
      '200': {
        description: 'Cliente.UsuarioCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioCliente)) where?: Where<UsuarioCliente>,
  ): Promise<Count> {
    return this.clienteRepository.usuarioCliente(id).delete(where);
  }
}
