import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FirebaseClass from '../../../../service/firebase';

import PokemonCard from '../../../../components/PokemonCard/index';

import { areSelectedPokemons, clearSelectedPokemons } from '../../../../store/selectedPokemons';
import { selectEnemyPokemonsData } from '../../../../store/enemyPokemons';
import { currentGameStatus } from '../../../../store/gameStatus';

import s from './style.module.css';


const Finish = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectedPokemonsRedux = useSelector(areSelectedPokemons);
  const selectEnemyPokemonsRedux = useSelector(selectEnemyPokemonsData);
  const currentGameStatusRedux = useSelector(currentGameStatus);
  

  const handleEndGameClick = () => {
    if(currentGameStatusRedux === true) {
      FirebaseClass.addPokemon(isSelected);
      isSelected!==null && history.push('/game');
    }
    dispatch(clearSelectedPokemons());
    history.push('/game');
  };

  if(Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace('/game');
  }

  const [isSelected, setSelected] = useState(null);

  return (
    <>
        <div className={s.wrap}>
        
          {
            Object.entries(selectedPokemonsRedux).map(([key, {name, img, id, type, values}]) => (
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
            disabled={currentGameStatusRedux ? isSelected===null : false}
          >
            END GAME
          </button>
        </div>
        <div className={s.wrap}>

      {
        selectEnemyPokemonsRedux.map((item) => (
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