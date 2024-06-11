import './Card.css'

const backImgSrc = "/img/cover.png";

export function Card({ card, onCardFlipFunc, revealed }) {
    const flipCard = () => {
        onCardFlipFunc(card);
    }

    return (
        <div className='Card'>
            {revealed &&
                <img className='front' src={ card.getSrc() } alt='card front'/>
            }
            {!revealed &&
                <img className='back' onClick={ flipCard } src={ backImgSrc } alt='card back'/>
            }
        </div>
    );
}