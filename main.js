const cardImages = ['at-at.svg','bounty_hunter.svg','c3po.svg','death_star.svg','clone.svg','yoda.svg','light_saber_green.svg','r2d2.svg','tie-fighter.svg']

class Card {
	constructor(value, display) {
		this.value = value
		this.display = display
	}
}

class Deck {
	constructor() {
		this.cards = []
		// this.pics = ["one", "two", "three", "four", "five"]

		for(let x = 0; x < 2; x++) {
			for(let v = 0; v < 5; v++) {
				let value = v
				this.cards.push(new Card(value, cardImages[v]))
			}
		}
	}

	shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let x = this.cards[i]
        this.cards[i] = this.cards[j]
        this.cards[j] = x
    }
  }

  get getCards() {
	return this.cards
  }
}

var deck = new Deck

console.log(deck)
deck.shuffle()



// class Board {
	deck.cards.forEach(card => {
		let cardhtml = `<div class="flip-container"><div class="flipper"><div class="front"><span class="cardvalue">${card.value}</span><img src="./resources/images/${card.display}"></div><div class="back"></div></div></div>`
		$("#gameboard").append(cardhtml)
	})
//}

var choices = []

$(".flipper").on("click", function(){
	$($(this)).toggleClass("flipped")
	
	if(choices.length < 2) {
		choices.push($(this).text())
	}
	if(choices.length === 2) {
		if(choices[0] === choices[1]) {

		}
	}
})
















