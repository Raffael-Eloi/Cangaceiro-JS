class Negociacao {
  constructor(_data, _quantidade, _valor) {
    Object.assign(this, { _quantidade, _valor });
    this._data = new Date(_data.getTime());
    Object.freeze(this); // Para tornar imutável
    // Object.assign(this, {_data = new Date(data.getTime()), _quantidade = quantidade, _valor = valor}) antes
  }

  get data() {
    return new Date(this._data.getTime()); // Para deixar a data imutável, porque a data utilizada apenas como new date pode ser mudada pelo set date
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get volumeTotal() {
    // let total = 0;
    // for (let i = 0; i < this._negociacoes.length; i++) {
    //   total += this._negociacoes[i].volume;
    // }
    // return total;

    return this._negociacoes.reduce(
      (total, negociacao) => total + negociacao.volume, 0);
  }
}
