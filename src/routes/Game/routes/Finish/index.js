import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard/index';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './style.module.css';


const Finish = () => {
  const pokemonContext = useContext(PokemonContext);
  const history = useHistory();

  const handleEndGameClick = () => {
    history.push('/game');
  }

  // if(Object.keys(pokemons).length === 0) {
  //   history.replace('/game');
  // }
  console.log('#### player2Pokemons: ', pokemonContext.player2);

  return (
        <div>
        
          {
            Object.entries(pokemonContext.pokemons).map(([key, {name, img, id, type, values, selected}]) => 
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
              />)
          }
        
      <button onClick={handleEndGameClick}>
        END GAME
      </button>

          {
            
          }
    </div>
  );
};

export default Finish;