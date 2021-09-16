import {useHistory} from 'react-router-dom';
import { useState } from 'react';

import s from './style.module.css';

import POKEMONS from '../../components/PokemonCard/pokemons';
import PokemonCard from '../../components/PokemonCard/index';

const GamePage = () => {
  const [pokemons, setPokemons] = useState(POKEMONS);
  const handleOpenPokemon = (id) => {
    setPokemons(pokemons.map(item => {
      if (item.id === id) {
        item.active = true;
      }
      return item;
    }));
  };


  const history = useHistory();
  const handleChangePage = () => {
    history.push('/')
  };
  return (
    <>
        <div>
          This is a game page.
        </div>

        <div className={s.flex}>
          {
            POKEMONS.map(item => <PokemonCard
              key={item.id} 
              name={item.name} 
              img={item.img} 
              id={item.id} 
              type={item.type} 
              values={item.values}
              handleOpenPokemon={handleOpenPokemon}
              isActive={item.active}
              />)
          }
        </div>

        <button onClick={handleChangePage}>
          Home Page
        </button>
    </>
  );
};

export default GamePage; 