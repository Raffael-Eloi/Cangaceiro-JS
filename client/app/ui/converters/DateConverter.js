class DateConverter {
  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }

  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static paraData(texto) {
    // Quando o input era do tipo date
    // if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
    //   throw new Error('Deve estar no formato aaaa-mm-dd');

    if (!/\d{2}\/\d{2}\/d{4}/.test(texto))
      throw new DataInvalidaException();

    return new Date(
      ...texto.split('/')
      .reverse()
      .map(
        (item, indice) => item - (indice % 2)
      )
    );
  }
}
