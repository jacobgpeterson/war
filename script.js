use strict;
$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);

	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players

	var deal = function() {
		while(deck.length){
			cards_player_1.push(deck.shift());
			cards_player_2.push(deck.shift());
		}
	}
	deal(deck, cards_player_1, cards_player_2);
	// var deal = function(deck, cards_player_1, cards_player_2) {   
 	// 	  	while(deck.length > 0){
 	// 	          var card = deck.shift();
	// 	          if(deck.length % 2 !== 0) {
	// 	              cards_player_1.push(card);
 	// 	          } else {
 	// 	              cards_player_2.push(card);
 	// 	          }       
 	// 	    	}
	// }
	// deal(deck, cards_player_1, cards_player_2);

	// var deal = function (arr) {
	// 	var leftSide = arr.splice(0, Math.ceil(arr.length /2));
	// 	cards_player_1.push(leftSide);
	// 	cards_player_2.push(arr);
	// }

	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2){
		// console.log(card1, card2)
		if (card1.number > card2.number) {
			// return (card1);
			return "player1"
		} else if (card1.number < card2.number) {
			// return (card2);
			return "player2"
		} else if (card1.number == card2.number) {
			return false;
		}
	}
	// war(cards_player_1[0], cards_player_2[0]);
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}

	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var tieStack = [];	
	var play = function(){
		newVar = war(cards_player_1[0], cards_player_2[0]);

		if (newVar === "player1") {
			cards_player_1.push(cards_player_2.shift());
			cards_player_1.push(cards_player_1.shift());
			cards_player_1.concat(tieStack);
			tieStack = [];
		} else if (newVar === "player2") {
			cards_player_2.push(cards_player_1.shift());
			cards_player_2.push(cards_player_2.shift());
			cards_player_2.concat(tieStack);
			tieStack = [];
		} else if (newVar === false) {
			tieStack.concat(cards_player_1.splice(0, 3).concat(cards_player_2.splice(0, 3)));
		}
		//this function (defined below) will continue to the next turn
		advance();
	}
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
