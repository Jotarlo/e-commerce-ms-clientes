import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DireccionCliente, DireccionClienteRelations} from '../models';

export class DireccionClienteRepository extends DefaultCrudRepository<
  DireccionCliente,
  typeof DireccionCliente.prototype.id,
  DireccionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DireccionCliente, dataSource);
  }
}
