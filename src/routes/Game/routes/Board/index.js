import { useContext, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard';

import s from './style.module.css';


const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;


    board.forEach(item => {
        if(item.card.possession === 'red') {
            player2Count++;
        }

        if(item.card.possession === 'blue') {
            player1Count++;
        }
    })

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const { pokemons, player2Pokemons, getGameStatus } = useContext(PokemonContext);
    const [board, setBoard] = useState([]); 
    const [player1, setPlayer1] = useState(() => (
        Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    ));

 

    const [player2, setPlayer2] = useState([]);
    const [choiseCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);


    const history = useHistory();


    useEffect(() => {
        const fetcData = async () => {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();

            setBoard(boardRequest.data);

            const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const player2Request = await player2Response.json();

            player2Pokemons(player2Request.data);

            setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                }))
            })
        }
        fetcData();
    }, []);

    if(Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }

    const handleClickBoardPlate = async(position) => {

        if(choiseCard) {
            const params = {
                position,
                card: choiseCard,
                board,
            };
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();


            if(choiseCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiseCard.id))
            }

            if(choiseCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiseCard.id))
            }

            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            });

        }
    }


    useEffect(() => {
        if(steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);
            if(count1 > count2) {
                alert('WIN');
                getGameStatus(true);
            } else if (count2 > count1) {
                alert('LOSE')
            } else {
                alert('DRAW');
            }

            history.push('/game/finish');
        }
    }, [steps])


    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard 
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                />
                
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate} 
                            onClick={() => !item.card && handleClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimaze />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard 
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;