// variaveis globais
let b;
let marcas = []; // todas as marcas
let carros = []; // todos os carros da marca escolhida
let anos = []; // todos os anos de lançamento do carro
let id_marcas = {}; // nome fipe da marca => id dessa marca
let id_carros = {}; // nome fipe do carro => id desse carro
let id_anos = {}; // ano do modelo do carro => id desse ano
var resposta; // guarda em json o que a API retorna
let carro_escolhido;
let marca_escolhida;
let ano_escolhido;

// Essa funcao roda assim que eh carregada a pagina.
// Ela serve pra fazer um fetch na API, colocar na variavel "marcas"
// todas as marcas retornadas e adicionar elas no primeiro menu de dropdown 
function pegarMarcas (){
  // primeiro fetch: pegar as marcas que estao disponiveis na API
  fetch('https://fipeapi.appspot.com/api/1/carros/marcas.json')
    .then(response => response.json())
    .then(result => {
      resposta = result;
      for (let i = 0; i < resposta.length; i++) {
        marcas.push(resposta[i]['fipe_name']);
        id_marcas[resposta[i]['fipe_name']] = resposta[i]['id'];
      }
      // sort case insensitive 
      marcas.sort((x,y) => x.localeCompare(y, undefined, {sensitivity: 'base'}));
     
      // colocar as marcas no menu de dropdown
      var select = document.getElementById('marca');
      for (let i = 0; i < marcas.length; i++){
        var option = document.createElement('OPTION');
        option.setAttribute('value', marcas[i]);
        var t = document.createTextNode(marcas[i]);
        option.appendChild(t);
        select.appendChild(option);
      }
    })
    .catch(error => {
        console.log(error);
    })
}

// essa funcao eh carregada assim que o usuario escolhe uma marca no primeiro
// menu de dropdown. Ela coloca no segundo menu de dropdown os carros encontrados
// a partir da marca escolhida pelo usuário
function pegarCarros(){
  marca_escolhida = document.getElementById('marca').value;
  let url = 'https://fipeapi.appspot.com/api/1/carros/veiculos/' + id_marcas[marca_escolhida] + '.json';

  fetch(url)
    .then(response => response.json())
    .then(result => {
      resposta = result;
      carros = [];
      for (let i = 0; i < resposta.length; i++) {
        carros.push(resposta[i]['fipe_name']);
        id_carros[resposta[i]['fipe_name']] = resposta[i]['id'];
      }

      // limpar todos os elementos no menu de dropdown do ano
      var select = document.getElementById('ano');
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
 
      // limpar todos os elementos no menu de dropdown
      select = document.getElementById('carro');
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
       
      // colocar os carros no menu de dropdown
      for (let i = 0; i < carros.length; i++){
        var option = document.createElement('OPTION');
        option.setAttribute('value', carros[i]);
        var t = document.createTextNode(carros[i]);
        option.appendChild(t);
        select.appendChild(option);
      }
    })
    .catch(error => {
        console.log(error);
    })
}

function pegarAno() {
  carro_escolhido = document.getElementById('carro').value;
  let url = 'https://fipeapi.appspot.com/api/1/carros/veiculo/' + id_marcas[marca_escolhida] + '/' + id_carros[carro_escolhido] + '.json';

  fetch(url)
    .then(response => response.json())
    .then(result => {
      resposta = result;
      anos = [];
      for (let i = 0; i < resposta.length; i++) {
        anos.push(resposta[i]['name']);
        id_anos[resposta[i]['name']] = resposta[i]['id'];
      }

      // limpar todos os elementos no menu de dropdown
      var select = document.getElementById('ano');
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
       
      // colocar os anos no menu de dropdown
      for (let i = 0; i < anos.length; i++){
        var option = document.createElement('OPTION');
        option.setAttribute('value', anos[i]);
        var t = document.createTextNode(anos[i]);
        option.appendChild(t);
        select.appendChild(option);
      }
    })
    .catch(error => {
        console.log(error);
    })
}

// Essa funcao descobre o carro escolhido pelo usuario e mostra
// no site o preco de tabela fipe e outras informacoes uteis
function botaoSubmit() {
  ano_escolhido = document.getElementById('ano').value;
  let url = 'https://fipeapi.appspot.com/api/1/carros/veiculo/' + id_marcas[marca_escolhida] + '/' + id_carros[carro_escolhido] + '/' + id_anos[ano_escolhido] + '.json';

  fetch(url)
    .then(response => response.json())
    .then(result => {
      resposta = result;
      
      // limpar todos os elementos que estavam anteriormente na tela
      var div = document.getElementById('principal');
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
       
      // colocar as informacoes da tabela fipe
      let aux;
      var h2 = document.createElement('P');
      h2.appendChild(document.createTextNode("Nome: " + resposta["name"]));
      h2.appendChild(document.createElement('BR'));
      if (resposta["ano_modelo"] == '32000') {
        aux = 'Zero KM';
      } else {
        aux = resposta['ano_modelo'];
      }
      h2.appendChild(document.createTextNode("Ano do modelo: " + aux));
      h2.appendChild(document.createElement('BR'));
      h2.appendChild(document.createTextNode("Marca: " + resposta["marca"]));
      h2.appendChild(document.createElement('BR'));
      h2.appendChild(document.createTextNode("Combustível: " + resposta["combustivel"]));
      h2.appendChild(document.createElement('BR'));
      h2.appendChild(document.createTextNode("Preço: " + resposta["preco"]));
      h2.appendChild(document.createElement('BR'));
      h2.appendChild(document.createTextNode("Referência: " + resposta["referencia"]));
      h2.appendChild(document.createElement('BR'));
      div.appendChild(h2);
    })
    .catch(error => {
        console.log(error);
    })
}

// Chamar a funcao de pegar as marcas assim que o javascript
// for baixado na página
pegarMarcas();
