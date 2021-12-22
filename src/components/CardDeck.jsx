import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box,
    Heading,
    Grid,
    Image,
    Flex,
    Button,
    Text
} from '@chakra-ui/react'
import deckImg from '../card-deck.png'

 function CardDeck(props) {
    const { deck_id, gameInit } = props
    const [ drawnDeck, setDrawnDeck ] = useState([])
    const [ shuffleInit, setShuffleInit ] = useState(false)
    const [ remaining, setRemaining ] = useState()
    const [ cardCompare, setCardCompare ] = useState()
    const [pair, setPair] = useState([])
    const [ triple, setTriple ] = useState([])

    useEffect(() => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}`)
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
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`)
            .then(res => setDrawnDeck(res.data.cards))
            .catch(err => console.error(err))

        setShuffleInit(prevState => !prevState)
    }

    const deleteCard = (cardId) => {
        setDrawnDeck(prevState => prevState.filter(card => card.code !== cardId))
    }

    const addCard = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(res => setDrawnDeck( prevState =>
            [...prevState, res.data.cards[0]]
        ))
        .catch(err => console.error(err))
    }

    const borderColorLogic = (card) => {
        if (pair[0] === card.value) {
            return 'yellow.500'
        }
        if (triple[0] === card.value) {
            return 'green.500'
        }
        else {
            return 'gray.500'
        }
    }

    const theRiver = drawnDeck.map(card => (
        <Box 
            justify='center' 
            align='center' 
            p={2} 
            m={3} 
            minH='35vh' 
            w={'25vh'} 
            border='solid' 
            borderColor={borderColorLogic(card)} 
            borderRadius='25px'
        >
            <Image src={card.image} />
            <Button
                size='sm' 
                colorScheme={'red'} 
                mt={2}
                onClick={() => deleteCard(card.code)}
            >
                    Remove
            </Button>
        </Box>
    ))

    return (
        <Box>
            {   
                gameInit &&
                <Box align={'center'}>

                    <Button 
                        w={'50%'} 
                        h={'10%'} 
                        backgroundColor={'green.500'} 
                        as='button'
                        onClick={drawCards}
                    >
                        <Heading color='white'>Draw 5</Heading>
                    </Button>
                    <Image 
                        src={deckImg} 
                        />

                    <Heading>Cards remaining: {remaining}</Heading>
                        <Heading>
                            {JSON.stringify(cardCompare)}
                        </Heading>
                    <Flex direction={'row'} align='center'>
                        {theRiver}
                        {
                            drawnDeck.length < 5 &&
                            <Button onClick={addCard} colorScheme={'green'}>Add</Button>
                        }
                    </Flex>

                </Box>
            }
            {
                pair.length !== 0 && triple.length !== 0 ?
                'Full house!'
                : <></>
            }
        </Box>
    )
}

export default CardDeck