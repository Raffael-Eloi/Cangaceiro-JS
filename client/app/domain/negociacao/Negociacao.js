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
}
