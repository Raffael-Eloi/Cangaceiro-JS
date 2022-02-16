class NegociacaoService {
  obterNegociacoesDaSemana(cb) {
    // cb = call back
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');
    // primeiro parâmetro -> tipo de requisição
    // segundo parâmetro  -> endereço/caminho/pah/URL

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log('Obtendo as negociações do servidor');

          const negociacoes = JSON.parse(xhr.responseText)
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          // .forEach(negociacao => this._negociacoes.adiciona(negociacao));

          // this._mensagem.texto = 'Negociações importadas com sucesso!';

          // OPERAÇÃO CONCLUÍDA, SEM ERRO
          cb(null, negociacoes);

        } else {
          console.log(xhr.responseText);
          // this._mensagem.texto = 'Não foi possível obter as negociações da semana';

          // ERRO NA OPERAÇÃO
          cb('Não foi possível obter nas negociações da semana', null);
        }
      }
    };

    xhr.send(); // Executa a requisição configurada

    // ESTADOS
    // 0: requisição ainda não iniciada; 
    // 1: conexão com o servidor estabelecida; 
    // 2: requisição recebida; 
    // 3: processando requisição; 
    // 4: requisição está concluída e a resposta está pronta;
  }
}