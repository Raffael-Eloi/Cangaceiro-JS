class ProxyFactory {
  static create(objeto, props, armadilha) {
    // Objeto    -> é o objeto alvo do proxy
    // Props     -> é um array com os métodos que desejamos interceptar
    // Armadilha -> é a funcão armadilha que desejamos executar para os métodos presentes no array props
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
          return function() {
            console.log(`"${props}" disparou a armadilha`);
            target[prop].apply(target, arguments);
            armadilha(target);
          }
        }
        else {
          return target[prop];
        }
      },

      set(target, prop, value, receiver) {
        const updated = Reflect.set(target, prop, value);
        if(props.includes(prop))
          armadilha(target);
        return updated;
      }
    });

  }
  
  static _ehFuncao(fn) {
    return typeof(fn) == typeof(Function);
  }
}