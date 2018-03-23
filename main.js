const cardImages = ['at-at.svg','bounty_hunter.svg','c3po.svg','death_star.svg','clone.svg','yoda.svg','light_saber_green.svg','r2d2.svg','tie-fighter.svg','falcon.svg','vader.svg','x-wing.svg']

class Card {
	constructor(value, display) {
		this.value = value
		this.display = display
	}
}

class Deck {
	constructor() {
		this.cards = []

		for(let x = 0; x < 2; x++) {
			for(let v = 0; v < 8; v++) {   //this value changes board size
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
deck.shuffle()

$(document).ready(function() {
	
	deck.cards.forEach(card => {
		let cardhtml = `<div class="flip-container"><div class="flipper"><div class="front"><span class="cardvalue">${card.value}</span><img src="./resources/images/${card.display}"></div><div class="back"><img src="./resources/images/playing_cards.png"/></div></div></div>`
		$("#gameboard").append(cardhtml)
	})
	
	var choices = [];
	let points = 0;
	$('.points-total').text(points)
	
	$(".flipper").on("click", function(){
		
		let choice = {}
		choice.elem=$(this)
		choice.value=Number($(this).text())
		$($(this)).toggleClass("flipped")
		$($(this)).css("pointer-events", "none");
		if(choices.length < 2) {
			choices.push(choice)
		}
		if(choices.length === 2) {
			if(choices[0].value === choices[1].value) {

				choices[0].elem[0].classList.add('disabled')
				choices[1].elem[0].classList.add('disabled')

				$('.disabled').off()
				$(".flipper").css("pointer-events", "auto");

				points += 10;
				$('.points-total').text(points)
			} else if (choices[0].value !== choices[1].value) {
				choices[0].elem[0].classList.add('unmatched')
				choices[1].elem[0].classList.add('unmatched')
				
				setTimeout(()=> {
						$(".unmatched").removeClass("flipped");
						$(".flipper").css("pointer-events", "auto");
						$(".flipper").removeClass('unmatched')
				}, 1000)
				points -= 2;
				$('.points-total').text(points)
			}
			choices = [];
		}
	})
})
			
			
			
			
			
			









