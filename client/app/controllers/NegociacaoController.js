class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document); // Precisa do bind porque o this da função tem que referenciar o document

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    let data = new Date(
      ...this._inputData.value
        .split('-')
        .map((item, indice) => item - (indice % 2))
    );
    console.log(data);

    let negociacao = new Negociacao(
      this._inputData.value,
      this._inputQuantidade.value,
      this._inputValor.value
    );
    console.log(negociacao);
  }
}
