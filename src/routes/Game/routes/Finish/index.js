import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard/index';
import { PokemonContext } from '../../../../context/pokemonContext';
import { FireBaseContext } from '../../../../context/firebaseContext';

import s from './style.module.css';


const Finish = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);
  const history = useHistory();



  const handleEndGameClick = () => {
    if(pokemonContext.gameStatus === true) {
      firebase.addPokemon(isSelected);
    }
    pokemonContext.clearContext();
    history.push('/game');
  }

  if(Object.keys(pokemonContext.pokemons).length === 0) {
    history.replace('/game');
  }


const [isSelected, setSelected] = useState(null);

  return (
    <>
        <div className={s.wrap}>
        
          {
            Object.entries(pokemonContext.pokemons).map(([key, {name, img, id, type, values}]) => (
              <div key={key}>
              <PokemonCard
                className={s.card}
                name={name} 
                img={img} 
                id={id} 
                type={type} 
                values={values}
                isActive={true}
              />
              </div>
            ))
          }
        </div>
        <div className={s.buttonWrap}>
          <button onClick={handleEndGameClick}
            disabled={pokemonContext.gameStatus ? isSelected===null : false}
          >
            END GAME
          </button>
        </div>
        <div className={s.wrap}>

      {
        pokemonContext.player2.map((item) => (
          <div key={item.id} 
            onClick={() => setSelected(item)}>
            <PokemonCard
              className={s.card}
              name={item.name} 
              img={item.img} 
              id={item.id} 
              type={item.type} 
              values={item.values}
              isActive
            />
          </div>
        ))}

    </div>
    </>
  );
};

export default Finish;