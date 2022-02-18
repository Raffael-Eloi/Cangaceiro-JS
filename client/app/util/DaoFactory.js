// class DaoFactory {
//   static getNegociacaoDao() {
//     return ConnectionFactory
//     .getConnection()
//     .then(
//       conn => new NegociacaoDao(conn)
//     );
//   }
// }

function getNegociacaoDao() {
  return ConnectionFactory.getConnection()
  .then(
    conn => new NegociacaoDao(conn)
  );
}