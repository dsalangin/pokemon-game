import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



import { getPokemonsAsync, selectPokemonsData, selectPokemonsLoading } from '../../../../store/pokemons';
import { onSelectedPokemons, areSelectedPokemons } from '../../../../store/selectedPokemons';

import PokemonCard from '../../../../components/PokemonCard/index';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './style.module.css';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);

  const SelectedPokemonsRedux = useSelector(areSelectedPokemons);
  console.log('#### SelectedPokemonsRedux: ', SelectedPokemonsRedux);

  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();

  console.log('#### pokemonsRedux: ', pokemonsRedux);

  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
    
  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
      dispatch(getPokemonsAsync());
    });

    return () => firebase.offPokemonSoket();
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux])

  const handleChangeSelected = (key) => {
    const pokemon = {...pokemons[key]}
    //pokemonsContext.onSelectedPokemons(key, pokemon);
    dispatch(onSelectedPokemons({key, pokemon}));
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
    setPokemons({});
  }

  return (
    <>
        <div className={s.buttonWrapper}>
          This is a game page.
        

          <button className={s.newPokemon} 
          onClick={handleStartGameClick}
          disabled={Object.keys(pokemonsContext.pokemons).length < 5}
          >
            Start Game
          </button>
        </div>
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