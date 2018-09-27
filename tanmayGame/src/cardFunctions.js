export const totalImages = 18;

export function generate_card_details() {
  //
  // Generate a set of cards with image pairs
  //
  let cards = [];
  let id=1;
  for(let i=1; i <= totalImages; i++) {
    let card1 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    id++;
    let card2 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    cards.push(card1);
    cards.push(card2);
    id++;
  }

  return cards;
};

export function card_matching(id, cards) {
  for(let i=0; i < 2*totalImages; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

export function cards_with_same_images(id1, id2, cards) {
  if (card_matching(id1, cards).image === card_matching(id2, cards).image) {
    return true;
  } else {
    return false;
  }
}
