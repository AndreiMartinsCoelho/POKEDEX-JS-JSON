const pokeNome = document.querySelector('.poke-name');
const pokeNumero = document.querySelector('.poke-number');
const pokemonImagem = document.querySelector('.pokemon-img');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const btnprox = document.querySelector('.btn-prox');
const btnante = document.querySelector('.btn-ante');
const tipoPOKE1 = document.getElementById("tipo-1");
const tipoPOKE2 = document.getElementById("tipo-2");

let sPokemon = 1;

const resetFields = () => {
  tipoPOKE1.innerHTML = "";
  tipoPOKE2.innerHTML = "";
};

const fetchPoke = async(poke)=>{
  const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
  if(API.status===200){
    const data = await API.json();
    return data;
  }
}

const rPoke = async (poke) => {
pokeNome.innerHTML = 'Carregar...';
pokeNumero.innerHTML = '';

  const data = await fetchPoke(poke);
  if (data) {
    pokemonImagem.style.display = 'block';
    pokeNome.innerHTML = data.name;
    pokeNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    sPokemon = data.id;
    tipoPOKE1.innerHTML = data.types[0].type.name;
    tipoPOKE2.innerHTML = "Só um tipo";
    tipoPOKE2.innerHTML = data.types[1].type.name;
  } else {
    pokemonImagem.style.display = 'none';
    pokeNome.innerHTML = 'Não tem';
    pokeNumero.innerHTML = '';
  }
}
  
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  rPoke(input.value.toLowerCase());
});
  
btnante.addEventListener('click', () => {
if (sPokemon > 1) {
  sPokemon -= 1;
  rPoke(sPokemon);
  }
});
  
btnprox.addEventListener('click', () => {
  sPokemon += 1;
  rPoke(sPokemon);
});
  
rPoke(sPokemon);

