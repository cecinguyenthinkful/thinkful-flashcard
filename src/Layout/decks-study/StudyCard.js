import React, {useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom'
import AddCardButton from './AddCardButton';
import FlipButton from './FlipButton';
import NextButton from './NextButton';

export default function StudyCard({cards, currentCard, setCurrentCard, deckId}) {
    const [frontOfCard, setFrontOfCard] = useState(true);
    const [cardIndex, setCardIndex] = useState(1); //applying base index value at 1
    const {url} = useRouteMatch();
    const history = useHistory();

    //function to handle flipping through cards
    function nextCard() {
        //if the index of the card being studied is less than the number of cards in the deck
        if (cardIndex < cards.length) {
            //flip the card over
            setFrontOfCard((frontSide) => !frontSide)
            setCurrentCard(cards[cardIndex])
            //adding 1 to the index to move to the next card indexed
            setCardIndex((currentCount) => currentCount + 1)
        } else {
            //confirmation if the end of the deck has been reached and the card has been flipped
            if (window.confirm("Would you like to practice cards again? Otherwise click cancel to return home.")) {
                setFrontOfCard((frontSide) => !frontSide);
                setCurrentCard(cards[0]);
                setCardIndex(1)
                //resetting the deck currently being studied if confirmation accepted
                history.push(url)
            } else {
                //otherwise returns the user home
                history.push("/")
            }
        }
    }
    //if there are not 3 cards, prompts the user to add more with AddCardButton
    if(cards.length < 3) {
        return (
            <div>
                <h3 className="text-danger font-weight-bold">Not Enough Cards!</h3>
                <p>You need at least 3 cards in a deck to study. There are {cards.length} cards in your deck. Try adding more!</p>
                <AddCardButton deckId={deckId} />
            </div>
        )
    }
    //display for front face of card
    if(frontOfCard) {
        return (
            <div className="card-card card">
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex} of {cards.length}</h5>
                    <p className="font-weight-bold">Front:</p>
                    <p className="card-text">{currentCard.front}</p>
                    <FlipButton setFrontOfCard={setFrontOfCard} />
                </div>
            </div>
        )
    }
    //display for backFace of card
    if(!frontOfCard) {
        return (
            <div className="card-card card">
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex} of {cards.length}</h5>
                    <p className="font-weight-bold">Back:</p>
                    <p className="card-text">{currentCard.back}</p>
                    <FlipButton setFrontOfCard={setFrontOfCard} />
                    <NextButton nextCard={nextCard} />
                </div>
            </div>
        )
    }
}
