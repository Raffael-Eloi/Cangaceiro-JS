class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    
    return this._http.get('negociacoes/semana')
      .then(
        dados => {
          const negociacoes = dados.map(
            objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
          );
          return negociacoes;
        }, 
        err => {
          throw new Error('Não foi possível obter as negociações');
        }
      );
  }
  //   ((resolve, reject) => {
      
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', 'negociacoes/semana');
  //     // primeiro parâmetro -> tipo de requisição
  //     // segundo parâmetro  -> endereço/caminho/pah/URL
  
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState == 4) {
  //         if (xhr.status == 200) {
  //           console.log('Obtendo as negociações do servidor');
  
  //           const negociacoes = JSON.parse(xhr.responseText)
  //           .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
  //           // .forEach(negociacao => this._negociacoes.adiciona(negociacao));
  
  //           // this._mensagem.texto = 'Negociações importadas com sucesso!';
  
  //           // CHAMOU RESOLVE -- OPERAÇÃO CONCLUÍDA, SEM ERRO
  //           resolve(negociacoes);
  
  //         } else {
  //           // console.log(xhr.responseText);
  //           // this._mensagem.texto = 'Não foi possível obter as negociações da semana';
  
  //           // CHAMOU REJECT -- ERRO NA OPERAÇÃO
  //           reject('Não foi possível obter os dados nas negociações');
  //         }
  //       }
  //     };
  
  //     xhr.send(); // Executa a requisição configurada
  
  //     // ESTADOS
  //     // 0: requisição ainda não iniciada; 
  //     // 1: conexão com o servidor estabelecida; 
  //     // 2: requisição recebida; 
  //     // 3: processando requisição; 
  //     // 4: requisição está concluída e a resposta está pronta;
  //   })

  // }


  obterNegociacoesDaSemanaAnterior() {
    return this._http
    .get('negociacoes/anterior')
    .then(
      dados => {
        const negociacoes = dados.map(
          objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          return negociacoes;
      },
      err => {
        throw new Error('Não foi possível obter as negociações da semana anterior');
      }
    );
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
    .get('negociacoes/retrasada')
    .then(
      dados => {
        const negociacoes = dados.map(
          objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          return negociacoes;
      },
      err => {
        throw new Error('Não foi possível obter as negociações da semana retrasada');
      }
    );
  }

  obtemNegociacoesDoPeriodo() {
    // ACESSA AOS PRÓPRIOS MÉTODOS ATRAVÉS DE THIS
    return Promise.all(
      [
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada()
      ]
    )
    .then( periodo => 
      periodo = periodo.reduce(
        (novoArray, item) => novoArray.concat(item, [])
      ).sort(
        (a, b) => b.data.getTime() - a.data.getTime()
      )
      // this._mensagem.texto = 'Negociações importadas com sucesso';
    )
    .catch(
      err => {
        console.log(err);
        throw new Error('Não foi possível obter as negociações do período')
      }
    );
  }
}