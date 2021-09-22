import {useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';

import database from '../../service/firebase';

import s from './style.module.css';

import PokemonCard from '../../components/PokemonCard/index';

const GamePage = () => {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      setPokemons(snapshot.val());
    })
  }, [pokemons]);


  const handleOpenPokemon = (id, objID) => {
    setPokemons(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = {...item[1]};
        if (pokemon.id === id) {
          pokemon.active =true;

          database.ref('pokemons/'+ objID).update({isActive:pokemon.active});
        };

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });
  };

  const addNewPokemon = () => {
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(Object.entries(pokemons)[0][1]);
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

        <button className={s.newPokemon} onClick = {addNewPokemon}>
          Add new pokemon
        </button>

        <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => 
              <PokemonCard
                objID={key}
                key={key} 
                name={name} 
                img={img} 
                id={id} 
                type={type} 
                values={values}
                handleOpenPokemon={handleOpenPokemon}
                isActive={active}
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