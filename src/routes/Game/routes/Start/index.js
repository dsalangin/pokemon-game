import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import s from './style.module.css';

import PokemonCard from '../../../../components/PokemonCard/index';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
    
  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    });

    return () => firebase.offPokemonSoket();
  }, []);


  const handleChangeSelected = (key) => {
    const pokemon = {...pokemons[key]}
    pokemonsContext.onSelectedPokemons(key, pokemon);
    setPokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      }
    }))
  };

  const handleStartGameClick = () => {
    history.push('/game/board')
  }

  return (
    <>
        <div>
          This is a game page.
        </div>

        <button className={s.newPokemon} 
        onClick={handleStartGameClick}
        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
        >
          Start Game
        </button>

        <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => 
              <PokemonCard
                className={s.card}
                key={key} 
                name={name} 
                img={img} 
                id={id} 
                type={type} 
                values={values}
                isSelected={selected}
                isActive={true}
                onClickCard={() => {
                  if(Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                    handleChangeSelected(key)
                  }
                }}
              />)
          }
        </div>
    </>
  );
};

export default StartPage; 