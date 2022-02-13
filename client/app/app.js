let controller = new NegociacaoController();

document
  .querySelector('.form')
  .addEventListener('submit', controller.adiciona.bind(controller)); // É necessário o bind porque no método "adiciona" existe uma referência do this, então deve colocar o bind(controller) para que ele referencie quem chamou o método
