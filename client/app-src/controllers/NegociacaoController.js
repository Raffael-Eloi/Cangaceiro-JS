import { Negociacoes } from '../domain/negociacao/Negociacoes.js';
import { NegociacoesView } from '../ui/views/NegociacoesView.js';
import { Mensagem } from '../ui/models/Mensagem.js';
import { MensagemView } from '../ui/views/MensagemView.js';
import { NegociacaoService } from '../domain/negociacao/NegociacaoService.js';
import { getNegociacaoDao } from '../util/DaoFactory.js';
import { DataInvalidaException } from '../ui/converters/DataInvalidaException.js';
import { Negociacao } from '../domain/negociacao/Negociacao.js';
import { Bind } from '../util/Bind.js';
import { DateConverter } from '../ui/converters/DateConverter.js';

export class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document); // Precisa do bind porque o this da função tem que referenciar o document

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    
    // const self = this;

    // this._negociacoes = new Proxy(new Negociacoes(), {
    //   get(target, prop, receiver) {
    //     if (typeof(target[prop]) == typeof(Function) && ['adiciona', 'esvazia'].includes(prop)) {
    //       return function() {
    //         console.log(`"${prop}" disparou a armadilha`);
    //         target[prop].apply(target, arguments);
    //       }
    //       self._negociacoesView.update(target);
    //     }

    //     else {
    //       return target[prop];
    //     }
    //   }
    // })

    // this._negociacoes = ProxyFactory.create(
    //   new Negociacoes(), 
    //   ['adiciona', 'esvazia'], 
    //   model => this._negociacoesView.update(model)
    // );

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    );

    // this._negociacoesView = new NegociacoesView('#negociacoes');
    // this._negociacoesView.update(this._negociacoes);

    // this._mensagem = ProxyFactory.create(
    //   new Mensagem(),
    //   ['texto'],
    //   model => this._mensagemView.update(model)
    // );

  //   this._mensagem = new Mensagem();

  //   this._mensagemView = new MensagemView('#mensagemView');
  //   this._mensagemView.update(this._mensagem);
  
    this._service = new NegociacaoService();

    this._init();
  }
  
  async _init() {
    try {
      const dao = await getNegociacaoDao();
      const negociacoes = await dao.listaTodos();

      negociacoes.forEach(
        negociacao => this._negociacoes.adiciona(negociacao)
      )
    }
    catch(err){
      // err.message extrai apenas a mensagem de erro da exceção
     this._mensagem.texto = err.menssage;
    }
  }

  async adiciona(event) {
    try {
      event.preventDefault();
      const negociacao = this._criaNegociacao();
      const dao = await getNegociacaoDao();
      await dao.adiciona(negociacao);

      this._negociacoes.adiciona(negociacao);
      this._mensagem.texto = "Negociação adicionada com sucesso"; 
      this._limpaFormulario();
    }
    catch(err) {
        this._mensagem.texto = err.message;
    }

      // this._negociacoesView.update(this._negociacoes);
      // this._mensagemView.update(this._mensagem);

    }
    catch(err) {
      console.log(err);
      console.log(err.stack);

      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.menssage;
      }

      else {
        this._mensagem.texto = "Um erro não esperado aconteceu. Entre em contato com o suporte";
      }
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
      parseInt(this._inputQuantidade.value),
      parseInt(this._inputValor.value)
    );
  }

  async apaga() {
    try {
      const dao = await getNegociacaoDao();
      await dao.apagaTodos();
      this._negociacoes.esvazia();
      this._mensagem.texto = "Negociações apagadas com sucesso"; 
    }
    catch(err) {
      err => this._mensagem.texto = err.message;
    };
  }

  async importaNegociacoes() {
    // this._service.obterNegociacoesDaSemana(
    //   (err, negociacoes) => {
    //     if (err) {
    //       this._mensagem.texto = 'Não foi possível obter nas negociações da semana';
    //       return;
    //     }

    //     negociacoes.forEach(
    //       negociacao => this._negociacoes.adiciona(negociacao)
    //     );

    //     this._mensagem.texto = 'Negociações importadas com sucesso';
    //   }
    // );

    // this._service.obterNegociacoesDaSemana()
    //   .then(
    //     negociacoes => {
    //       negociacoes.forEach(
    //         negociacao => this._negociacoes.adiciona(negociacao)
    //       );
    //       this._mensagem.texto = 'Negociações importadas com sucesso';
    //     },

    //     err => this._mensagem.texto = err
    //   );

      // const negociacoes = [];

      // this._service
      // .obterNegociacoesDaSemana()
      // .then(semana => {
      //   negociacoes.push(...semana);
      //   return this._service.obterNegociacoesDaSemanaAnterior();
      // })
      // .then(anterior => {
      //   negociacoes.push(...anterior);
      //   negociacoes.forEach(
      //     negociacao => this._negociacoes.adiciona(negociacao)
      //   )
      // .then(retrasada => {
      //   negociacoes.push(...retrasada);
      //   negociacoes.forEach(
      //     negociacao => this._negociacoes.adiciona(negociacao)
      //   );
        
      //   this._mensagem.texto = 'Negociações importadas com sucesso';
      // })
      // .catch(
      //   err => this._mensagem.texto = err
      // );
      // })

      // RECEBE UM ARRAY DE PROMISES
      // Promise.all(
      //   [
      //     this._service.obterNegociacoesDaSemana(),
      //     this._service.obterNegociacoesDaSemanaAnterior(),
      //     this._service.obterNegociacoesDaSemanaRetrasada()
      //   ]
      // )
      // .then( periodo => {
      //   periodo = periodo.reduce(
      //     (novoArray, item) => novoArray.concat(item, [])
      //     .forEach(
      //       negociacao => this._negociacoes.adiciona(negociacao)
      //     )
      //   )
      //   this._mensagem.texto = 'Negociações importadas com sucesso';
      // })
      // .catch(
      //   err => this._mensagem.texto = err
      // );

      try {
        const negociacoes = await this._service.obtemNegociacoesDoPeriodo();
        console.log(negociacoes);
        negociacoes.filter(
          novaNegociacao => !this._negociacoes.paraArray().some(
            negociacaoExistente => novaNegociacao.equals(negociacaoExistente)
          )
        ).forEach(
          negociacao => this._negociacoes.adiciona(negociacao)
          );
        this._mensagem.texto = 'Negociações do período importadas com sucesso';
      }
      catch(err) {
        this._mensagem.texto = err.message
      }
      // SOME / some() -> itera em cada elemento de uma lista. 
      // cont_ Assim que encontrar algum (some) elemento de acordo com alguma lógica que retorne true, 
      // cont_ parará imediatamente de iterar o array retornando true.
      // cont_ Se nenhum elemento atender o critério de comparação, o array terá sido percorrido até o fim e o retorno de some será false.
  }
}
