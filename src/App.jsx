import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FavoritePokemon from "./components/FavoritePokemon";
import ReactLoading from 'react-loading';

function App() {
  const [pokemonData, setPokemonData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        // Make the API call using axios
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPokemonData(response.data);
        setError("");
      } catch (error) {
        setError("Error fetching data:", error); // Handle errors here
      } finally {
        setLoading(false);
        // abortController.abort(); // Cleanup logic (optional in this case)
      }
    };

    loadPoke();

    return () => abortController.abort(); // Cleanup function for abortController
  }, [number]);

  const prevPokemon = () => {
    setNumber((number) => number - 1);
  };

  const nextPokemon = () => {
    setNumber((number) => number + 1);
  };

  const addFavorite = () => {
    setFavorite((oldFavorite) => [...oldFavorite, pokemonData]);
  };

  return (
    <div className="block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <ReactLoading type='spin' color='blue' height='20%' width='20%' />
          ) : (
            <>
              <h1>{pokemonData?.name}</h1>
              <button onClick={addFavorite}>Add to favourite</button>
              <br />
              <img
                src={pokemonData?.sprites?.other?.home?.front_default}
                alt={pokemonData?.name}
              />
              <ul>
                {pokemonData?.abilities?.map((abi, index) => (
                  <li key={index}>{abi?.ability?.name}</li>
                ))}
              </ul>
              <button onClick={prevPokemon}>Previous</button>
              <button onClick={nextPokemon}>Next</button>
            </>
          )}
        </div>

        <div>
          <h2>Your favorite pokemon</h2>
          {favorite.length > 0 ? <FavoritePokemon favorite={favorite} />
          : <div className="flex h-full items-center justify-center"><h5>No favorite pokemon...</h5></div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
