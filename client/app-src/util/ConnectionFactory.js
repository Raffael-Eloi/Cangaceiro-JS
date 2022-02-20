/*
  IIFE (Immediately-invoked function expression)
  funções imediatas
  segue o padrão Module Pattern
*/

export const ConnectionFactory = (() =>  {
  const stores = ['negociacoes'];

  // COMEÇA SEM CONEXÃO
  let connection = null;

  // VARIÁVEL QUE ARMAZENARÁ A FUNÇÃO ORIGINAL
  let close = null; 

  // RETORNA A DEFINIÇÃO DA CLASSE
  class ConnectionFactory {
    constructor() {
      throw new Error('Não é possível criar instâncias dessa classe');
    }

    static getConnection() {
      return new Promise( (resolve, reject) => {
        if (connection) return resolve(connection);

        const openRequest = indexedDB.open('jscangaceiro', 2);

        openRequest.onupgradeneeded = e => {
          // PASSA A CONEXÃO PARA O MÉTODO
          ConnectionFactory._createStores(e.target.result);
        }

        openRequest.onsuccess = e => {
          // só será executado na primeira vez que a conexão for criada
          connection = e.target.result;

          // Guardando a função original
          close = connection.close.bind(connection);

          /* 
            Monkey patch
            Modificamos um método "nativo" da API, pois não queremos dar essa opção de fechamanto de conexão ao desenvolvedor (esse fechamento específico)
            Como JS permite alterar funções em tempo de execução, estamos alterando o método close 
          */
          connection.close = () => {
            throw new Error('Você não pode fechar diretamente a conexão');
          }
          
          // passa o resultado (conexão) para a promise
          resolve(connection);
        }

        openRequest.onerror = e => {
          console.log(e.target.error);
          // passa o erro para reject da promise
          reject(e.target.error.name);
        }

      })
    }

    static _createStores(connection) {
      stores.forEach(
        store => {
          if (connection.objectStoreNames.contains(store))
            connection.deleteObjectStore(store);
            connection.createObjectStore(store, {autoIncrement: true});
        }
      )
    }

    static closeConnection() {
      if (connection) {
        close();
      }
    } 
  }
  
});

// a variável vive no escopo global
// porque foi declarada fora da função
// const ConnectionFactory = tmp();

