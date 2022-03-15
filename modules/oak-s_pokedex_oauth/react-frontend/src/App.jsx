import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const [list, setList] = useState(true)
  const [card, setCard] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [headers, setHeaders] = useState(new Headers())

  useEffect(() => {
    fetch("http://localhost:3000/pokemon", {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(responseJson => {
        setPokemons({ pokemons: responseJson.data });
      },
      )
  })
  const showCard = (id) => {
    fetch(`http://localhost:3000/pokemon/${id}`, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(
        responseJson => { setPokemons({ pokemons: responseJson.data }) },
      );
    setList(false)
    setCard(true)

  };
  const showList = () => {
    setList(true)
    setCard(false)
  };

  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="container">
      {list ? (
        <div className="list-group">
          {pokemons.map(pokemon => (
            <li
              onClick={() => showCard(pokemon._id)}
              className="list-group-item list-group-item-action"
            >
              {pokemon.name}
            </li>
          ))}
        </div>
      ) : null}
      {card ? (
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{pokemon.name}</h5>
            <p class="card-text">{pokemon.type}</p>
            <div onClick={() => showList()} class="btn btn-primary">
              Back
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App;
