export function debounce(fn, millisegundos) {
  return () => {
    // usa um temporizador para chamar fn()
    // depois de tantos milisegundos

    let timer = 0; // guarda o ID de um timer, 0 indica que não há nenhum

    return () => {
      // para o último timer definido
      clearTimeout(timer);

      // a variável timer ganha o ID de um novo temporizador
      // afeta a variável no escopo da unção debounce
      timer = setTimeout(
        () => fn(),
        millisegundos
      );
    } 
  }
}