class Card {
	constructor(value, display) {
		this.value = value
		this.display = display
	}
}

class Deck {
	constructor() {
		this.cards = []
		this.pics = ["one", "two", "three", "four", "five"]

		for(let x = 0; x < 2; x++) {
			for(let v = 0; v < 5; v++) {
				let value = v
				this.cards.push(new Card(value, this.pics[v]))
			}
		}
	}
}

var deck = new Deck

console.log(deck)