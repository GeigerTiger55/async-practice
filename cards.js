"use strict";

const CARD_BASE_URL = 'http://deckofcardsapi.com/api';
const $cardDrawn = $('#card-drawn');
let globalDeckId ='';

/** Draw a random card and print to the console 
 * TODO: 
 * - make the new card add to a list instead of overwriting the last drawn card
 * - do something when no more cards left
*/

async function drawCard(evt) {
  evt.preventDefault();
  const deckId = $cardDrawn.data('deck-id');

  let card = await axios.get(`${CARD_BASE_URL}/deck/${deckId}/draw/?count=1`);

  $('#card-drawn').text(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
}

$('#new-card').on('click', drawCard);

//drawCard();

/** Draw two cards from the same deck */

async function drawTwoCards() {
  let resp = await axios.get(`${CARD_BASE_URL}/deck/new/draw/?count=1`);
  console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);

  let deckId = resp.data.deck_id;

  let resp2 = await axios.get(`${CARD_BASE_URL}/deck/${deckId}/draw/?count=1`);
  console.log(`${resp2.data.cards[0].value} of ${resp2.data.cards[0].suit}`);
}

//drawTwoCards();


/** Get a new deck on page load */
async function getNewDeck(){

  const resp = await axios.get(`${CARD_BASE_URL}/deck/new/shuffle/?deck_count=1`);

  const deckId = resp.data.deck_id;

  //globalDeckId = deckId;
  //console.log('deckId', deckId);
  $cardDrawn.attr('data-deck-id', deckId);

  //$cardDrawn.html(deckId);

}

getNewDeck();



