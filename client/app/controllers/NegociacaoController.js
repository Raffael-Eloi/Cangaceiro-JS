class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document); // Precisa do bind porque o this da função tem que referenciar o document

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    
    // const self = this;

    // this._negociacoes = new Proxy(new Negociacoes(), {
    //   get(target, prop, receiver) {
    //     if (typeof(target[prop]) == typeof(Function) && ['adiciona', 'esvazia'].includes(prop)) {
    //       return function() {
    //         console.log(`"${prop}" disparou a armadilha`);
    //         target[prop].apply(target, arguments);
    //       }
    //       self._negociacoesView.update(target);
    //     }

    //     else {
    //       return target[prop];
    //     }
    //   }
    // })

    // this._negociacoes = ProxyFactory.create(
    //   new Negociacoes(), 
    //   ['adiciona', 'esvazia'], 
    //   model => this._negociacoesView.update(model)
    // );

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    );

    // this._negociacoesView = new NegociacoesView('#negociacoes');
    // this._negociacoesView.update(this._negociacoes);

    // this._mensagem = ProxyFactory.create(
    //   new Mensagem(),
    //   ['texto'],
    //   model => this._mensagemView.update(model)
    // );

  //   this._mensagem = new Mensagem();

  //   this._mensagemView = new MensagemView('#mensagemView');
  //   this._mensagemView.update(this._mensagem);
  
  this._service = new NegociacaoService();
}

  adiciona(event) {
    try {
      event.preventDefault();
      this._negociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = "Negociação adicionada com sucesso"; 
      // this._negociacoesView.update(this._negociacoes);
      // this._mensagemView.update(this._mensagem);

      this._limpaFormulario();
    }
    catch(err) {
      console.log(err);
      console.log(err.stack);

      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.menssage;
      }

      else {
        this._mensagem.texto = "Um erro não esperado aconteceu. Entre em contato com o suporte";
      }
    }
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseInt(this._inputValor.value)
    );
  }

  apaga() {
    this._negociacoes.esvazia();
    // this._negociacoesView.update(this._negociacoes);
    this._mensagem.texto = 'Negociações foram apagadas com sucesso';
    // this._mensagemView.update(this._mensagem);
  }

  importaNegociacoes() {
    this._service.obterNegociacoesDaSemana(
      (err, negociacoes) => {
        if (err) {
          this._mensagem.texto = 'Não foi possível obter nas negociações da semana';
          return;
        }

        negociacoes.forEach(
          negociacao => this._negociacoes.adiciona(negociacao)
        );

        this._mensagem.texto = 'Negociações importadas com sucesso';
      }
    );
  }
}
