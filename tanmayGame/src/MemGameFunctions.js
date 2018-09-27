export const flip_up_each_card = 'FLIP_UP_CARD';
export const shuffle_cards = 'SHUFFLE_CARDS';
export const matched_pair_checking = 'CHECK_MATCHED_PAIR';
export const MARK_PAIR_AS_MATCHED = 'MARK_PAIR_AS_MATCHED';
export const flip_down_each_card = 'FLIP_DOWN_PAIR';
export const init_game = 'INIT_GAME';

export function startingStep() {
  return { type: init_game };
}

export function flipDownPair(id1, id2) {
  return { type: flip_down_each_card, id1: id1, id2: id2 }
}
export function MatchingPair(id1, id2) {
  return { type: MARK_PAIR_AS_MATCHED, id1: id1, id2: id2 }
}

export function checkMatchedPair() {
  return { type: matched_pair_checking };
}

export function flipUpCard(id) {
  return { type: flip_up_each_card, id };
}

export function card_shuffling() {
  return { type: shuffle_cards };
}
