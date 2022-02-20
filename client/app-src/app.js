import { NegociacaoController } from './controllers/NegociacaoController.js';
import { debounce } from './util/index.js';

const controller = new NegociacaoController();

const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.adiciona.bind(controller)); // É necessário o bind porque no método "adiciona" existe uma referência do this, então deve colocar o bind(controller) para que ele referencie quem chamou o método

$('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));

// $('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));
$('#botao-importa').addEventListener('click', debounce(
  () => controller.importaNegociacoes.bind(controller)
));