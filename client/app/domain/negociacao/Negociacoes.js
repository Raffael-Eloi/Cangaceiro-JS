class Negociacoes {
  constructor(armadilha) {
    this._negociacoes = [];
    this._armadilha = armadilha;
    Object.freeze(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    this._armadilha(this);
  }

  paraArray() {
    return [].concat(this._negociacoes); // para retornar uma nova instância do array e torná-lo imutável
  }

  esvazia() {
    this._negociacoes.length = 0;
    this._armadilha(this);
  }
}
