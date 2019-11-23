const api_key_alpha_vantage = 'PF4WWS72GIK7QJF5';
const api_key_crypto_compare = '9005263449f87dbb3cae6926f7dc793b3568105a06285229b8f14f8710259df8';
let moeda;
let paridade;
let a;
let b;

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

let fetchData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(result => {
      a = result;
      b = json2array(a);
      b[0] = json2array(b[0]);
      if (b.length == 2) {
        b[1] = json2array(b[1]);
      }
      console.log(a);
      console.log(b);
    })
    .catch(error => {
      console.log(error);
    })
}
fetchData('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=CNY&apikey=demo');

function funcaoBotao() {
  console.log(a);
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

let dados = document.getElementById('dados');
console.log(dados);

