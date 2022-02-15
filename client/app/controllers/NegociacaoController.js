class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document); // Precisa do bind porque o this da função tem que referenciar o document

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    
    this._negociacoes = new Negociacoes(model => {
      console.log(this);
      this._negociacoesView.update(model);
    });

    this._negociacoesView = new NegociacoesView('#negociacoes');
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = new Mensagem();

    this._mensagemView = new MensagemView('#mensagemView');
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociação adicionada com sucesso"; 
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update(this._mensagem);

    this._limpaFormulario();
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
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  apaga() {
    this._negociacoes.esvazia();
    this._negociacoesView.update(this._negociacoes);
    this._mensagem.texto = 'Negociações foram apagadas com sucesso';
    this._mensagemView.update(this._mensagem);
  }
}
