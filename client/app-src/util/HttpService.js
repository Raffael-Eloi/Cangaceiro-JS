export class HttpService {
  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/semana');
      // primeiro parâmetro -> tipo de requisição
      // segundo parâmetro  -> endereço/caminho/pah/URL
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            // PASSOU O RESULTADO PARA RESOLVE
            // JÁ PARSEADO
            resolve(JSON.parse(xhr.responseText));
          }
          else {
            console.log(xhr.responseText);
            
            // PASSOU O ERRO PARA A REJECT
            reject(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }
}