import './App.css';
import { CardArray } from './classes/CardArray.js';
import { Card } from './components/Card.js';
import { CardInst } from './classes/CardInst.js';
import { useEffect, useState } from 'react';


export default function App() {
    const [cards, setCards] = useState(new CardArray());
    const [turns, setTurns] = useState(0);
    const [choices, setChoices] = useState([]);
    const [locked, setLocked] = useState(false);

    const initGame = () => {
        let cards = new CardArray(
            new CardInst("helmet"),
            new CardInst("potion"),
            new CardInst("ring"),
            new CardInst("scroll"),
            new CardInst("shield"),
            new CardInst("sword")
        );
        cards.duplicateNecessaryCards();
        cards.shuffle();
        setCards(cards);
        setTurns(0);
        setChoices([]);
        setLocked(false);
    }

    useEffect(() => {
        cards.forEach((card) => {
            const img = new Image();
            img.src = card.getSrc();
        });
    }, [cards]);

    const onCardFlip = (card) => {
        if (locked) return;
        card.flip();
        setChoices(prevChoices => prevChoices.concat(card));
    }

    useEffect(() => {
        if (choices.length === 0) return;
        const selectedNames = choices.map(choice => choice.name);
        const filteredNames = selectedNames.filter(name => name === selectedNames[0]);
        const fullSet = cards.filter(card => card.name === selectedNames[0]);

        if (selectedNames.length !== filteredNames.length) {
            // bad selection, increment turns, unflip the cards, and reset choices
            setTurns(prevTurns => prevTurns + 1);
            setLocked(true);
            setTimeout(() => {
                choices.forEach(choice => choice.flip());
                setChoices(() => []);
                setLocked(false);
            }, 300);
        } else if (selectedNames.length !== fullSet.length) {
            // not the full set yet, wait for next flip
        } else {
            // the full set has been selected, increment turns and reset choices
            setTurns(prevTurns => prevTurns + 1);
            setChoices(() => []);
        }
    }, [choices, cards]);

    return (
        <div className="App">
            <h1>Memory Game</h1>
            <button onClick={initGame}>New Game</button>
            <p>You have used {turns} turns.</p>
            <div className='card-grid'>
                {cards.map(card =>
                    <Card key={ card.id } card={ card } onCardFlipFunc={ onCardFlip } revealed={ card.flipped }/>
                )}
            </div>
        </div>
    );
}
