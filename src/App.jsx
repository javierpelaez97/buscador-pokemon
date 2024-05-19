import { useState } from 'react'
import './App.css'
import Axios from "axios"   //Añadimos axios para hacer las peticiones de manera mas sencilla y funcional


function App() {
  const[pokemonName, setPokemonName] = useState("")
  const[pokemonChosen , setPokemonChosen] = useState(false)  // creamos una nuevo estado que nos indique si hay o no un pokemon seleccionado
  const [pokemon, setPokemon] = useState({
    name:"",
    number: "",
    species:"",
    image:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    type:""
  })


  const searchPokemon = () => { 
    Axios.get( `https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(  //Podemos concatenar la URL de la pokeapi con la variable guardada
      (res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
        })
        setPokemonChosen(true)
      }
    )
    
  }

  return (
    <>
    <div className='App'>
      <div className='TitleSection'>
        <h2>Pokedex</h2>
        <input type ="text"
        onChange={(event)=>{   //Coge el valor del input y a medida del cambio lo guarda en una variable event
          setPokemonName(event.target.value)  //Busca el elemento con la propiedad HTML target
        }}
        value={pokemonName.toLowerCase()}></input>
        <button onClick={searchPokemon}>Buscar pokemon</button> 
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
          <h1>Elige el nombre del pokemon</h1>
        ) : (
          <>
          <div className='container'>
            <div className='card'>
            <img src={pokemon.image} alt={pokemon.name} className='card-img-top'></img>
            <div className='card-body'>
               <h1 className='card-title'>{pokemon.name}</h1>
            </div>
           <ul className='list-group list-group-flush'>
            <li className='list-group-item'>Number: #{pokemon.number}</li>
            <li className='list-group-item'>Species: {pokemon.species}</li>
            <li className='list-group-item'>Type: {pokemon.type}</li>
            <li className='list-group-item'>HP: {pokemon.hp}</li>
            <li className='list-group-item'>Attack: {pokemon.attack}</li>
            <li className='list-group-item'>Defense: {pokemon.defense}</li>
            <li className='list-group-item'>Speed: {pokemon.speed}</li>
           </ul>
            
          </div>
            
          </div>
          
            
          </>
          
        )}
      </div>
      
    </div>
    
      
    </>
    
  )
}

export default App
