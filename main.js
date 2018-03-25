const cardImages = ['at-at.svg','bounty_hunter.svg','c3po.svg','death_star.svg','clone.svg','yoda.svg','light_saber_green.svg','r2d2.svg','tie-fighter.svg','falcon.svg','vader.svg','x-wing.svg'];
var chewy = new Audio("resources/audio/chewy.mp3");
var flipcard = new Audio("resources/audio/flip.mp3");
var jedi = new Audio("resources/audio/disturbance.mp3");
var cantina = new Audio("resources/audio/cantina.mp3");
var r2d2 = new Audio("resources/audio/r2talking.mp3");
var blip = new Audio("resources/audio/blip.mp3")
var btnClick = new Audio("resources/audio/btn-click.mp3");
var currenthealth = document.getElementById("healthbar")

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
			for(let v = 0; v < this.numOfCards; v++) {   //numOfCards value changes board size
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
	cantina.play()
	
	//r2 comes in on start screen
	setTimeout(function() {
		$('#r2').animate({left: '+=800'}, {easing: 'swing'})//.delay(10000).animate({left: '+=1200'}, {easing: 'swing'}).delay(10000).animate({left: '-=1200'}, {easing: 'swing'})
		r2d2.play();
	},1500) 
	$('#start-easy').on("mouseup", function(e) {
		chewy.play();
		loadGame($(this), 9, 100);
	})
	$('#start-hard').on("mouseup", function(e) {
		jedi.play();
		loadGame($(this), 12, 200);
	})
	$('#speaker').on("click", function() {
		cantina.pause();
	})
	$('#start-game').on("mouseup", function(e) {
		btnClick.load();
		btnClick.play();
		$('#start-game, #start-easy, #start-hard').fadeToggle();
	})
	$('#backBtn').on("click", function(e) {
		// e.preventDefault();
		btnClick.load();
		btnClick.play();
		if ($('#start-game').css('display') == 'none') {
			$('#start-game, #start-easy, #start-hard').fadeToggle();
		}
	})
	// $('#backBtnEnd').on("mouseup", function(e) {
	// 	// e.preventDefault();
	// 	btnClick.play();
	// 	location.href="./index.html"
	// })

	function loadGame(thisDiv, numOfPairs, health) {
		//r2 leaves on screen right selection
		setTimeout(function() {
			$('#r2').animate({left: '+=1200'}, {easing: 'swing'})
		},1000) 
		//moves start buutons off screen left
		$('.container-start').animate({right: '100%'}, function(){ $('.container-start').remove(); })
		//builds new deck
		var deck = new Deck(numOfPairs)
		deck.shuffle()
		cantina.pause()
		//loads boards
		setTimeout(function() {
			$('#points').removeClass('hide')
			$('#health').removeClass('hide')
			$('#timer').removeClass('hide')
			makeBoard(deck.cards ,health)
		},1000)
		//then attaches click event handlers
		setTimeout(function() {
			playGame(deck.cards.length, health)
		},3500)
	}

	//make makeBoard a class
	var choices = [];
	let points = 0;    //tracks points on correct or incorrect match
	let turnCount = 0  //increments one on each match attempt
	var timetime = new Date().getTime()
	var endTime = timetime + (2 * 62000)

	function makeBoard(cards, health) {
		//pushes a card to screen at interval
		(function displayCards(cards) {
			$.each(cards, function(i) {
				setTimeout(function() { 
					let cardhtml = `<div class="flip-container"><div class="flipper"><div class="front"><span class="cardvalue">${cards[i].value}</span><img src="./resources/images/${cards[i].display}"></div><div class="back"><img src="./resources/images/playing_cards.png"/></div></div></div>`
					$("#gameboard").append(cardhtml)
				},100 * i)
			})
		})(cards)

		setInterval(function () {
			let curtime = new Date().getTime()
			let timeleft = endTime - curtime

			let minleft = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
			let secleft = Math.floor((timeleft % (1000 * 60)) / 1000)

			if(secleft < 10) {
				secleft = "0" + secleft
			}
			if(minleft === 0 && secleft < 2) {
				setTimeout(function() {
					location.href="./lose.html"
				},1500)
			}

			$("#timecount").html(minleft + ":" + secleft)

		}, 1000)

		setTimeout(function() {
			$('.points-total').text(points);              
		},0)
	}		

	function playGame(cardsLeft, health) {
		$(".flipper").on("click", function(){
			let choice = {};
			choice.elem=$(this);
			choice.value=Number($(this).text());
			flipcard.play();
			$($(this)).toggleClass("flipped");
			$($(this)).css("pointer-events", "none");;

			if(choices.length < 2) {
				choices.push(choice);
			}

			if(choices.length === 2) {
			    $('.flipper').css("pointer-events", "none");
				turnCount++

				if(choices[0].value === choices[1].value) {
					choices[0].elem[0].classList.add('disabled');
					choices[1].elem[0].classList.add('disabled');
					blip.play();
					$('.disabled').off();
					$(".flipper").css("pointer-events", "auto");
					cardsLeft -=2;
					points += 10;
					$('.points-total').text(points);
					if (cardsLeft === 0) {
						setTimeout(function() {
							location.href="./win.html"
						},1000)
					}
				} else if (choices[0].value !== choices[1].value) {
					currenthealth.value -= 10;
					points -= 2;
					points <= 0 ? points = 0 : points;
					choices[0].elem[0].classList.add('unmatched');
					choices[1].elem[0].classList.add('unmatched');
					
					setTimeout(()=> {
						$(".unmatched").removeClass("flipped");
						$(".flipper").css("pointer-events", "auto");
						$(".flipper").removeClass('unmatched');
						$('.health-total').text(health);
						$('.points-total').text(points);
					}, 1000)
				}
				choices = [];
			}
			if (currenthealth.value === 0) {
				setTimeout(function() {
					location.href="./lose.html"
				},1500)
			}
		})
	}
});
			
			
			
			
			
			









