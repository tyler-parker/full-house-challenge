import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GameContext = React.createContext()

export default function GameProvider(props) {
    const [ drawnDeck, setDrawnDeck ] = useState([])
    const [ remaining, setRemaining ] = useState()
    const [ cardCompare, setCardCompare ] = useState()
    const [ pair, setPair] = useState([])
    const [ triple, setTriple ] = useState([])

    const [ deck, setDeck ] = useState()
    const [ gameInit, setGameInit ] = useState(false)
    
    const getDeck = async () => {
      await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => setDeck(res.data))
        .catch(err => console.error(err))
      setGameInit(prevState => !prevState)
      console.log(deck);
      console.log(deck.deck_id);
      console.log(gameInit);
    }
    
    useEffect(() => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}`)
            .then(res => setRemaining(res.data.remaining))
            .catch(err => console.error(err))
    }, [drawnDeck])

    useEffect(() => {
        compareCards()
    }, [drawnDeck])
    
    const compareCards = () => {
        const count = {}
        const pair = []
        const triple = []

        drawnDeck.forEach(el => {
            if (count[el.value]) {
                count[el.value] += 1
                return
            } 
            count[el.value] = 1
        })

        for (let prop in count) {
            if (count[prop] === 2) {
                pair.push(prop)
            }
            if (count[prop] === 3) {
                triple.push(prop)
            }
        }

        setCardCompare(count)
        setPair(pair)
        setTriple(triple)
        return pair || triple
    }

    const drawCards = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=5`)
            .then(res => setDrawnDeck(res.data.cards))
            .catch(err => console.error(err))
    }

    const deleteCard = (cardId) => {
        setDrawnDeck(prevState => prevState.filter(card => card.code !== cardId))
    }

    const addCard = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(res => setDrawnDeck( prevState =>
            [...prevState, res.data.cards[0]]
        ))
        .catch(err => console.error(err))
    }
    return (
        <GameContext.Provider
            value={{
                drawnDeck,
                remaining,
                cardCompare,
                pair,
                triple,
                deck,
                gameInit,
                drawCards,
                deleteCard,
                addCard,
                getDeck
            }}
        >
            {props.children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider }