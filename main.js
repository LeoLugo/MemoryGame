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
	//r2 comes in on start screen
	setTimeout(function() {
		$('#r2').animate({left: '+=800'}, {easing: 'swing'})
	},1500) 
	$('#start-easy').on("mouseup", function(e) {
		chewy.play()
		loadGame($(this))
	})
	$('#start-hard').on("mouseup", function(e) {
		jedi.play()
		loadGame($(this))
	})

	function loadGame(thisDiv) {
		//r2 leaves on screen right selection
		setTimeout(function() {
			$('#r2').animate({left: '+=1200'}, {easing: 'swing'})
		},1000) 
		//moves start buutons off screen left
		$('.container-start').animate({right: '50%'}, function(){ $('.container-start').remove(); })
		//builds new deck
		var deck = new Deck(Number(thisDiv[0].attributes[5].nodeValue))
		console.log(deck)
		deck.shuffle()
		cantina.pause()
		$('#points').removeClass('hide')
		// $('.container-start').addClass('hide')
		setTimeout(function() {
			makeBoard(deck.cards)
			$('#points').removeClass('hide')
			$('#health').removeClass('hide')
		},1500)
	}


	function makeBoard(cards) {
		
		cards.forEach(card => {
			let cardhtml = `<div class="flip-container"><div class="flipper"><div class="front"><span class="cardvalue">${card.value}</span><img src="./resources/images/${card.display}"></div><div class="back"><img src="./resources/images/playing_cards.png"/></div></div></div>`
			$("#gameboard").append(cardhtml)
		})

		var choices = [];
		let points = 0;    //tracks points on correct or incorrect match
		let health = 100;  //subs ten on incorrect match	
		let turnCount = 0  //increments one on each match attempt
		let cardsLeft = cards.length
		$('.points-total').text(points)
		$('.health-total').text(health)

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
				turnCount++
				if(choices[0].value === choices[1].value) {
					choices[0].elem[0].classList.add('disabled')
					choices[1].elem[0].classList.add('disabled')

					$('.disabled').off()
					$(".flipper").css("pointer-events", "auto");
					cardsLeft -=2
					points += 10;
					$('.points-total').text(points)
					if (cardsLeft === 0) {
						location.href="./win.html"
					}
				} else if (choices[0].value !== choices[1].value) {
					health -= 10;
					points -= 2;
					
					choices[0].elem[0].classList.add('unmatched')
					choices[1].elem[0].classList.add('unmatched')
					
					setTimeout(()=> {
							$(".unmatched").removeClass("flipped");
							$(".flipper").css("pointer-events", "auto");
							$(".flipper").removeClass('unmatched')
					}, 1000)
					$('.health-total').text(health)
					$('.points-total').text(points)
				}
				choices = [];
			}
			if (health === 0) {
				setTimeout(function() {
					location.href="./lose.html"
				},1000)
			}
		})
	}

	$('#start-game').on("mouseup", function(e) {
		$('#start-game, #start-easy, #start-hard').fadeToggle();
	})
})
			
			
			
			
			
			









