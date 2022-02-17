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

  equals(negociacao) {
    return JSON.stringify(this) == JSON.stringify(negociacao);
    // JSON.stringify() converte um objeto em uma representação textual, ou seja, uma string
    


      // this.data.getDate() == negociacao.data.getDate() 
      // && this.data.getMonth() == negociacao.data.getMonth()
      // && this.data.getFullYear() == negociacao.data.getFullYear()
      // && this.quantidade == negociacao.quantidade
      // && this.valor == negociacao.valor;
  }
}


