import { useRouteMatch, Switch, Route } from 'react-router-dom'
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../context/pokemonContext';
import { useState } from 'react';

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [player2, setPlayer2] = useState([])
    console.log('#### selectedPokemons: ', selectedPokemons);
    const match = useRouteMatch();

    const handleSelectedPokemons = (key, pokemon) => {
      setSelectedPokemons(prevState => {
        if(prevState[key]) {
          const copyState = {...prevState};
          delete copyState[key];

          return copyState;
        }
        return {
          ...prevState,
          [key]: pokemon,
        }
      })
    }

    const handleGetPokemons = (pokemons) => {
      setPlayer2(prevState => (pokemons));
    };




    return (
      <PokemonContext.Provider value = {{
        pokemons: selectedPokemons,
        onSelectedPokemons: handleSelectedPokemons,
        player2,
        player2Pokemons: handleGetPokemons
      }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
      </PokemonContext.Provider>
    );
};

export default GamePage;