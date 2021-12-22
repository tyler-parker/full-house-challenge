import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box,
    Heading,
    Grid,
    Image,
    Flex,
    Button
} from '@chakra-ui/react'
import deckImg from '../card-deck.png'

 function CardDeck(props) {
    const { deck_id, gameInit } = props
    const [ drawnDeck, setDrawnDeck ] = useState([])
    const [ shuffleInit, setShuffleInit ] = useState(false)
    const [ remaining, setRemaining ] = useState()
    const cardCount = [1,2,3,4,5]

    useEffect(() => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}`)
            .then(res => setRemaining(res.data.remaining))
            .catch(err => console.error(err))
    }, [drawnDeck])

    const drawCards = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`)
            .then(res => setDrawnDeck(res.data.cards))
            .catch(err => console.error(err))

        setShuffleInit(prevState => !prevState)
        console.log(drawnDeck);
        console.log(shuffleInit)
    }

    const deleteCard = (cardId) => {
        setDrawnDeck(prevState => prevState.filter(card => card.code !== cardId))
        console.log(drawnDeck)
        console.log(drawnDeck.length)
    }

    const addCard = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(res => setDrawnDeck( prevState =>
            [...prevState, res.data.cards[0]]
        ))
        .catch(err => console.error(err))
        console.log(drawnDeck)
        console.log(deck_id)
    }

    const theRiver = drawnDeck.map(card => (
        <Box justify='center' align='center' p={2} m={3} minH='35vh' w={'25vh'} border='solid' borderColor='gray.500' borderRadius='25px'>
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
                        <Heading>Shuffle deck</Heading></Button>
                    <Image 
                        src={deckImg} 
                    />

                    <Heading>Cards remaining: {remaining}</Heading>
                    <Flex direction={'row'} align='center'>
                        {theRiver}
                        {
                            drawnDeck.length < 5 &&
                            <Button onClick={addCard} colorScheme={'green'}>Add</Button>
                        }
                    </Flex>

                </Box>
            }
        </Box>
    )
}

export default CardDeck