import { createStore } from 'redux'
import memoryGame from './ReducerFunctioning'
import { flipUpCard, checkMatchedPair } from './MemGameFunctions';
import { card_matching } from './cardFunctions';

// Test functions in redux-store are used to obtain each 
// state of the container depicting overall steps needed to 
// match the cards. Each pair can be found using id number 
// n and (n+1) , n can be an odd number. 


// Test to check total of 36 cards in the grid layout of images. 
test(() => {
  let store = createStore(memoryGame);
  let state = store.getState();
  expect(state.cards.length).toBe(36);
});


// Test to check flipping up a card returns an image on back-side
test(() => {
  let store = createStore(memoryGame);
  expect( card_matching( 1, store.getState().cards ).imageUp).toBe(false);
  store.dispatch(flipUpCard(1));
  expect( card_matching( 1, store.getState().cards ).imageUp).toBe(true);
});


// Test to check for next card after matching cards is valid and is properly triggered
test(() => {
  let store = createStore(memoryGame);
  store.dispatch(flipUpCard(1));
  store.dispatch(flipUpCard(2));
  store.dispatch(flipUpCard(3));
  // to check 3rd card is triggered/displayed after previous 2 cards are matched. 
  expect( card_matching( 1, store.getState().cards ).matched).toBe(true);
  expect( card_matching( 2, store.getState().cards ).matched).toBe(true);
  //flipping of 3rd card was valid
  expect( card_matching( 1, store.getState().cards ).imageUp).toBe(true);
});


// Test to check pair of matching cards found with same image on them
test(() => {
  let store = createStore(memoryGame);
  expect(store.getState().pairsFound).toBe(0);
  
  // flipping the first card.
  store.dispatch(flipUpCard(1));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);
  
  // flipping the second card to match with first card.  
  store.dispatch(flipUpCard(2));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(1);
  expect( card_matching( 1, store.getState().cards ).matched).toBe(true);
  expect( card_matching( 2, store.getState().cards ).matched).toBe(true);
  expect( card_matching( 1, store.getState().cards ).image).toBe( card_matching( 1, store.getState().cards ).image);
});

// Test to check pair of cards not found as a result of different images
test(() => {
  let store = createStore(memoryGame);
  expect(store.getState().pairsFound).toBe(0);
  store.dispatch(flipUpCard(1));
  store.dispatch(flipUpCard(3));
  store.dispatch(checkMatchedPair());
  expect(store.getState().pairsFound).toBe(0);
  expect( card_matching( 1, store.getState().cards ).image).not.toBe( card_matching( 3, store.getState().cards ).image);
});


// Test to check game is completed once all cards matched
test(() => {
  let store = createStore(memoryGame);
  expect(store.getState().gameComplete).toBe(false);

  // Flipping the first 17 pairs (34 matches)
  for(let id=1; id <=34; id=id+2) {
    store.dispatch(flipUpCard(id));
    store.dispatch(flipUpCard(id+1));
    store.dispatch(checkMatchedPair());
    expect( store.getState().gameComplete).toBe(false);  
  }
  // Flip the last pair of cards to match and complete the game. 
  store.dispatch(flipUpCard(35));
  store.dispatch(flipUpCard(36));
  store.dispatch(checkMatchedPair());
  expect(store.getState().gameComplete).toBe(true);
});

// Test to check turnNo updated for remaining cards
test(() => {
  let store = createStore(memoryGame);
  expect(store.getState().turnNo).toBe(1);
  // Flip the last few remaining cards to match and update its turnNo.  
  let turnNo=1;
  for(let id=1; id <=34; id=id+2) {
    store.dispatch(flipUpCard(id));
    store.dispatch(flipUpCard(id+1));
    store.dispatch(checkMatchedPair());
    turnNo++;
    expect(store.getState().turnNo).toBe(turnNo);  
  }
});
