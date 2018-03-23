const cardImages = ['at-at.svg','bounty_hunter.svg','c3po.svg','death_star.svg','clone.svg','yoda.svg','light_saber_green.svg','r2d2.svg','tie-fighter.svg','falcon.svg','vader.svg','x-wing.svg']
var chewy = new Audio("resources/audio/chewy.mp3")
var flipcard = new Audio("resources/audio/flip.mp3")
var jedi = new Audio("resources/audio/disturbance.mp3")
var cantina = new Audio("resources/audio/cantina.mp3")
cantina.play()
// let numOfCards = 0;
// console.log(numOfCards)
class Card {
	constructor(value, display) {
		this.value = value
		this.display = display
	}
}

class Deck {
	constructor(numOfCards) {
		this.cards = []
		this.numOfCards = numOfCards
		// this.numOfCards = 0
		for(let x = 0; x < 2; x++) {
			
			for(let v = 0; v < this.numOfCards; v++) {   //this value changes board size
				// console.log(this.numOfCards)
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

$(document).ready(function() {
	$('#start-easy').on("mouseup", function(e) {
		$('.container-start').animate({right: '50%'}, function(){ $('.container-start').remove(); })
		var deck = new Deck(Number($(this)[0].attributes[5].nodeValue))
		deck.shuffle()
		cantina.pause()
		chewy.play()
		// jedi.play()   add this sound effect to hard mode

		$('#points').removeClass('hide')
		// $('.container-start').addClass('hide')
		makeBoard(deck.cards)
		setTimeout(function() {
			$('#points').removeClass('hide')
			$('#health').removeClass('hide')
			makeBoard(deck.cards)
		},1000)

	})

	function makeBoard(cards) {
		
		cards.forEach(card => {
			let cardhtml = `<div class="flip-container"><div class="flipper"><div class="front"><span class="cardvalue">${card.value}</span><img src="./resources/images/${card.display}"></div><div class="back"><img src="./resources/images/playing_cards.png"/></div></div></div>`
			$("#gameboard").append(cardhtml)
			console.log(card)
		})

		var choices = [];
		let points = 0;
		let health = 100;
		$('.points-total').text(points)
		$('.health-total').text(points)

		$(".flipper").on("click", function(){
			flipcard.play()

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
	}

	$('#start-game').on("mouseup", function(e) {
		$('#start-game, #start-easy, #start-hard').fadeToggle();
	})
	// $('#start-easy').on("mouseup", function(e) {
	// 	deck = new Deck(8)
	// 	deck.shuffle()
	// 	// window.location.href = 'file:///Users/punchcode/PC/MemoryGame/index.html';
	// 	deck.numOfCards = Number($(this)[0].attributes[5].nodeValue)
	// 	// location.reload();
	// })
})
			
			
			
			
			
			









