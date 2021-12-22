import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box,
    Heading,
    Image,
    Flex,
    Button,
    Text
} from '@chakra-ui/react'
import deckImg from '../card-deck.png'

 function CardDeck(props) {
    const { deck_id, gameInit } = props
    const [ drawnDeck, setDrawnDeck ] = useState([])
    const [ remaining, setRemaining ] = useState()
    const [ cardCompare, setCardCompare ] = useState()
    const [ pair, setPair ] = useState([])
    const [ triple, setTriple ] = useState([])

    // each time the drawn deck state changes, retrieve remaining cards and compare cards
    useEffect(() => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}`)
            .then(res => setRemaining(res.data.remaining))
            .catch(err => console.error(err))
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
    
    // const clearCards = (gameInit) => {
    //     if (gameInit) {
    //         setDrawnDeck([])
    //     }
    // }
    // clearCards(gameInit)

    const drawCards = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`)
            .then(res => setDrawnDeck(res.data.cards))
            .catch(err => console.error(err))
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
            border='solid' 
            borderColor={borderColorLogic(card)} 
            borderRadius='25px'
        >
            <Image src={card.image} key={card.code} />
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
            <Box align={'center'}>

                <Image 
                    src={deckImg} 
                    w={{sm: '45vh'}}
                />
                <Button 
                    size={'lg'} 
                    h={'10%'} 
                    backgroundColor={'green.500'} 
                    as='button'
                    onClick={drawCards}
                >
                    {
                        gameInit &&
                        <Heading color='white'>Draw 5</Heading>
                    }
                </Button>

                <Heading mt={4}>Cards remaining: {remaining}</Heading>
                    {
                        pair.length !== 0 && triple.length !== 0 ?
                        <Heading size={'2xl'} color={'green'}>Full House!</Heading>
                        : <></>
                    }
                    <Text>
                        {JSON.stringify(cardCompare)}
                    </Text>
                <Flex direction={{sm: 'column', md: 'row', lg: 'row', xl: 'row'}} align='center'>
                    {/* displays your 5 cards */}
                        {theRiver}
                    {/* shows the 'Add' button if you have less than 5 cards and have started the game */}
                        {
                            drawnDeck.length < 5 && drawnDeck.length !== 0 ?
                                <Button onClick={addCard} colorScheme={'green'}>Add</Button>
                            :
                                <>
                                </>
                        }
                </Flex>
            </Box>
            {/* Shows that you've won if you have a double and triple */}
        </Box>
    )
}

export default CardDeck