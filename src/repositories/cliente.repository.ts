import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, DireccionCliente, UsuarioCliente} from '../models';
import {DireccionClienteRepository} from './direccion-cliente.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly direccionCliente: HasOneRepositoryFactory<DireccionCliente, typeof Cliente.prototype.id>;

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DireccionClienteRepository') protected direccionClienteRepositoryGetter: Getter<DireccionClienteRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
    this.direccionCliente = this.createHasOneRepositoryFactoryFor('direccionCliente', direccionClienteRepositoryGetter);
    this.registerInclusionResolver('direccionCliente', this.direccionCliente.inclusionResolver);
  }
}
