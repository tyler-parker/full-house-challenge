# Full House Coding Challenge
![The gang's all here](https://cdn.cnn.com/cnnnext/dam/assets/190312133445-full-house-super-tease.jpg)

## Starting the app:
* Clone the repo
* Install packages `npm install`
* Run `npm start`

## Current bugs:
* Card requests are not limited to 2 seconds
* "Restart Game" button is only toggling components -- need to have button that calls a new deck
* Only way to start new deck is to refresh the page

## Backlog:
* Need to present the `cardCompare` object better. Right now it's just stringified
* Maybe some animations on the cards to spin when there's a full house
* ## Requirements:
The goal of this exercise is to create a web page that performs the task below. You are
free to use a framework (e.g. React/Angular/Vue) if you like. Also, this is open-resource,
so any resource besides another person is welcome. Once complete, push your code to
a public repository (e.g. GitHub). You have 24 hours to complete this exercise and email
us a link to the repository.

1. Create one new, shuffled deck of cards (reference https://deckofcardsapi.com/
for api instructions).
2. Using the deck_id obtained from step 1, draw 5 cards from the deck and display
their images on the web page.
3. Discard any number of cards (up to 5) from your “hand” by removing them from
the web page, draw from the deck the number of cards you discarded, then
display the newly drawn card images on the web page alongside the card images
that were not discarded.
4. Repeat step 3 until you have a full house (i.e. 3 of one type of card and 2 of
another. See https://en.wikipedia.org/wiki/List_of_poker_hands#Full_house for
more information on what constitutes a full house). The goal is to reach a full
house in the fewest number of draws possible. Keep in mind you must have 5
card images on the web page after each new draw, you cannot reuse cards you
previously discarded, and you can only make api requests for new cards once
every 2 seconds.
5. Once you have a full house, stop drawing cards and highlight the card images
that belong to the full house using any kind of css styling you like.
