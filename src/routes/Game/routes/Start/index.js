import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemonsAsync, selectPokemonsData } from '../../../../store/pokemons';
import { onSelectedPokemons, areSelectedPokemons } from '../../../../store/selectedPokemons';

import PokemonCard from '../../../../components/PokemonCard/index';

import s from './style.module.css';

const StartPage = () => {

  const SelectedPokemonsRedux = useSelector(areSelectedPokemons);
  console.log('#### SelectedPokemonsRedux: ', SelectedPokemonsRedux);

  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();

  console.log('#### pokemonsRedux: ', pokemonsRedux);

  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
    
  useEffect(() => {
      dispatch(getPokemonsAsync());
      setPokemons(SelectedPokemonsRedux);
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux])

  const handleChangeSelected = (key) => {
    const pokemon = {...pokemons[key]}
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
          disabled={Object.keys(SelectedPokemonsRedux).length < 5}
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
                  if(Object.keys(SelectedPokemonsRedux).length < 5 || selected) {
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