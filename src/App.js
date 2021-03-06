import React, { useState } from 'react';
import axios from 'axios'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import CardDeck from './components/CardDeck';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button
} from '@chakra-ui/react';

function App() {
  const [ deck, setDeck ] = useState()
  const [ gameInit, setGameInit ] = useState(false)

  // initializes the deck, then pass deck ID and game state
  const getDeck = async () => {
    await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => setDeck(res.data))
      .catch(err => console.error(err))
    setGameInit(prevState => !prevState)
    console.log(deck.deck_id);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            {/* passing deck ID and game state as props */}
            <CardDeck 
              remaining={gameInit && deck.remaining} 
              gameInit={gameInit} 
              deck_id={gameInit && deck.deck_id} 
            />
            {/* retrieves new deck */}
            <Button 
              onClick={getDeck}
              m={6}
              color={`${gameInit ? 'red' : 'green'}`}
              size={'lg'}
            >
              {gameInit ? 'Restart Game' : 'Start Game' }
            </Button>

          </VStack>
        </Grid>
      </Box> 
    </ChakraProvider>
  );
}

export default App;