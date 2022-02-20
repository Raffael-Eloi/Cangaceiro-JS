import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';

// class DaoFactory {
//   static getNegociacaoDao() {
//     return ConnectionFactory
//     .getConnection()
//     .then(
//       conn => new NegociacaoDao(conn)
//     );
//   }
// }

export async function getNegociacaoDao() {
  let conn = await ConnectionFactory.getConnection(); 
  return new NegociacaoDao(conn);
}