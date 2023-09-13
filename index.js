const Pokemon = document.getElementById("pokemon")
Pokemon.style.display = "grid"
Pokemon.style.gridTemplateColumns = "repeat(2,1fr)"
Pokemon.style.gap = "10px"
Pokemon.style.padding = "20px"

let toUpperCaseName = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
}

let limit = 20;
let offset = 0;

const Pokemons_card = (Pokemon)=>{
    const div = document.createElement("div")
    div.innerHTML = `
       <img style="height:55%; max-width:"200px"" src="${Pokemon.sprites.other.dream_world.front_default}" alt="${Pokemon.name}">
       <h1>${toUpperCaseName(Pokemon.name)}</>
    `
    div.style.height = "350px"
    div.style.width = "300px"
    div.style.border = "1px solid black"
    div.style.borderRadius = "10px"
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.justifyContent = "space-around"
    div.style.alignItems = "center"
    div.style.padding = "10px"
    div.style.backgroundColor = "skyblue"
    div.style.color = "rgb(2, 2, 49)"
    return div
}


const getUrls = async (url)=>{
    const res = await fetch(url);
    const url_data = await res.json();
    console.log(url_data)
    Pokemon.appendChild(Pokemons_card(url_data))
}



const PokemonData = async()=>{
    let api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}.`
    const res = await fetch(api)
    const main_url_data = await res.json();
    // console.log(data)
  
    main_url_data.results.forEach(element => {
          getUrls(element.url)
    });

}
PokemonData()


const Pre_Pokemons = () =>{
    Pokemon.innerHTML = ""
    offset -= 20
    let api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}.`
    PokemonData(api)
}

const Next_Pokemons = () =>{
    Pokemon.innerHTML = ""
    offset += 20
    let api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}.`
    PokemonData(api)
}



// ----------------------------------------------------------------Search box code----------------------------------------------------------------------------



document.querySelector("#search").addEventListener('click',getpokemon);

const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
}

const pokemon_name_lowercase = (string)=>{
    return string.toLowerCase();
}

function getpokemon(e){
     const name = document.querySelector('#pokemon_name').value;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name_lowercase(name)}`).then((res)=>res.json())
    .then((data)=>{
        document.querySelector('#pokemonbox').innerHTML=`
        <div id='image'>
           <img src="${data.sprites.other.dream_world.front_default}" alt="${capitalizeFirstLetter(data.name)}">
        </div>
       <div id='details'>
           <h1>${capitalizeFirstLetter(data.name)}</h1>
           <b id='h'>Height :${data.height}</b>
           <b id='w'>Weight :${data.weight}</b>
           <b id='be'>Base-Experience :${data.base_experience}</b>
       </div>
        `
    }).catch((err)=>console.log(err));


    e.preventDefault();
}
