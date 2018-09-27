import { flip_up_each_card, shuffle_cards, matched_pair_checking, MatchingPair, 
        MARK_PAIR_AS_MATCHED, flipDownPair, flip_down_each_card, init_game, 
        card_shuffling, checkMatchedPair, flipUpCard } from "./MemGameFunctions";
import shuffle from 'shuffle-array';
import { totalImages, generate_card_details, card_matching, cards_with_same_images } from './cardFunctions';

const initial_starting_state_memory_game = {
  turnNo : 1,
  pairsFound : 0,
  numClicksWithinTurn : 0,
  firstId : undefined,
  secondId : undefined,
  gameComplete: false,
  cards: generate_card_details()
};

//  Reducer function used here is to predict the 
//  next step for matching the pair, based on
//  previous un-shuffled initial state of the cards. 

function memoryGameCards(state = [], action) {
  switch (action.type) {
    case flip_up_each_card:
      return state.map((card) => {
        if (action.id === card.id) {
          return Object.assign({}, card, {
            imageUp: true
          });
        }
        return card;
      });
    
    case MARK_PAIR_AS_MATCHED:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            matched: true
          })
        }
        return card;
      });
    
    case flip_down_each_card:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            imageUp: false
          })
        }
        return card;
      });
    
    case shuffle_cards:
      let newCards = [...state];
      newCards = shuffle(newCards);
      return newCards;
    
    default:
      return state;
  }
}

// The reducer for the game
// state is an object with game state and an array of cards

function memoryGame(state = initial_starting_state_memory_game, action) {
  switch (action.type) {
    case init_game:
      return Object.assign({}, initial_starting_state_memory_game, { cards: memoryGameCards(initial_starting_state_memory_game.cards, card_shuffling()) } );
    
    case matched_pair_checking:
      if (state.numClicksWithinTurn === 2 && cards_with_same_images(state.firstId, state.secondId, state.cards)) {
        let pairsFound = state.pairsFound + 1;      // cards matched. 
        let gameComplete = false;
        if (pairsFound === totalImages) {
          gameComplete = true;
        }
        return Object.assign({}, state, { 
          pairsFound: pairsFound,
          turnNo: state.turnNo + 1,
          numClicksWithinTurn: 0,
          gameComplete: gameComplete, 
          cards: memoryGameCards(state.cards, MatchingPair(state.firstId, state.secondId)) } );      
      } else if (state.numClicksWithinTurn === 2) {       // cards didn't matched. 
        return Object.assign({}, state, { 
          numClicksWithinTurn: 0,
          turnNo: state.turnNo + 1, 
          cards: memoryGameCards(state.cards, flipDownPair(state.firstId, state.secondId)) } );              
      }
      return state;
    
    case flip_up_each_card:                      // check for match cards and trigger a next card, 
    											//  if matching is found. 
      if (state.numClicksWithinTurn === 2)
      {
        let s = memoryGame(state, checkMatchedPair());
        return memoryGame(s, flipUpCard(action.id));
      }

      let card = card_matching(action.id, state.cards);
      if (card.imageUp || card.matched) {        
        return state;
      }

      let firstId = state.firstId;
      let secondId = state.secondId;
      if (state.numClicksWithinTurn === 0) {
        firstId = action.id;
      } else {
        secondId = action.id;
      }
      let numClicks = state.numClicksWithinTurn + 1;

      return Object.assign({}, state, { 
        firstId: firstId, 
        secondId: secondId, 
        numClicksWithinTurn : numClicks,
        cards: memoryGameCards(state.cards, action) } );    
    
    case shuffle_cards:
      return Object.assign({}, state, { cards: memoryGameCards(state.cards, action) } );
    
    default:
      return state;
  }
}

export default memoryGame;
