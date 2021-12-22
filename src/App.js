import React, { useState } from 'react';
import axios from 'axios'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
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

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            {/* Deck goes here */}
            <Grid templateColumns='repeat(1fr, 5)'>
              {/* dealt cards go here */}
            </Grid>
            {
              // !gameInit ?
                <Button onClick={getDeck}>Shuffle Deck</Button>
              // : <></>
            }
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
