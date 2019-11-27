// variaveis globais
let b;
let marcas = [];
let carros = [];
let id_marcas = {};
var resposta;

// funcao super util que TALVEZ eu use alguma hora
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

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
  let marca_escolhida = document.getElementById('marca').value;
  let url = 'https://fipeapi.appspot.com/api/1/carros/veiculos/' + id_marcas[marca_escolhida] + '.json';

  fetch(url)
    .then(response => response.json())
    .then(result => {
      resposta = result;
      carros = [];
      for (let i = 0; i < resposta.length; i++) {
        carros.push(resposta[i]['fipe_name']);
      }

      // limpar todos os elementos no menu de dropdown
      var select = document.getElementById('carro');
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

// ESSA FUNCAO TA ERRADA
// Vou mudar ela depois 
function funcaoBotao() {
  moeda = document.getElementById('moeda').value;
  paridade = document.getElementById('paridade').value;
  console.log(moeda);
  console.log(paridade);
  if (moeda.length > 5 || moeda.length == 0 || moeda.length == 1) {
    alert('Por favor, digite um código válido de criptomoeda, como: BTC, ETH, BCH, XMR, USDT');
    document.getElementById('moeda').style.border = "2px solid red";
  }
  else {
    document.getElementById('moeda').style.border = "2px solid #4ad893";
  }
}

// chamar a funcao de pegar as marcas assim que o javascript
// for baixado na página
pegarMarcas();
