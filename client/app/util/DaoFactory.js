import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js'; // class DaoFactory {
//   static getNegociacaoDao() {
//     return ConnectionFactory
//     .getConnection()
//     .then(
//       conn => new NegociacaoDao(conn)
//     );
//   }
// }

export function getNegociacaoDao() {
  return ConnectionFactory.getConnection().then(conn => new NegociacaoDao(conn));
}
//# sourceMappingURL=DaoFactory.js.map