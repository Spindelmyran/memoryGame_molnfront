/**
 * New node file
 */
 var Memory = function($) {
	setVar = function() {
		colour = [], hidden = [], position = [], nextpos = 16;

	};
	winClass = function(cards, sc1, points, imgxyz, pairs) {
		var cards = cards;
		var sc1 = sc1;
		var points = points;
		var imgxyz = imgxyz;
		var pairs = pairs;

		this.getCards = function() {
			return (cards);
		}
		this.setCards = function(newCards) {
			cards = newCards;
		}
		this.setCardsPlus = function() {
			cards = cards + 1;
		}

		this.getSc1 = function() {
			return (sc1);
		}
		this.setSc1 = function(newSc1) {
			sc1 = newSc1;
		}

		this.getPoints = function() {
			return (points);
		}
		this.setPointsPlus = function() {
			points = points + 1;
		}
		this.setPointsMinus = function() {
			points = points - 1;
		}

		this.getImgxyz = function() {
			return (imgxyz);
		}
		this.setImgxyz = function(newImgxyz) {
			imgxyz = newImgxyz;
		}

		this.getPairs = function() {
			return (pairs);
		}
		this.setPairsPlus = function() {
			pairs = pairs + 1;
		}

		this.resetVars = function() {
			cards = 0;
			sc1 = 16;
			points = 30;
			imgxyz = 16;
			pairs = 0;
		}
	};
	var win1 = new winClass(0, 16, 30, 16, 0),

	
	startArray = function() {
	colour[0] = "#3be6c4";	
	colour[1] = "#e6e03b";	
	colour[2] = "#6f3be6";	
	colour[3] = "#4fe63b";	
	colour[4] = "#e63b3b";	
	colour[5] = "#ff5a00";	
	colour[6] = "#ff00de";	
	colour[7] = "#3b8fe6";
	colour[8] = "#3be6c4";	
	colour[9] = "#e6e03b";	
	colour[10] = "#6f3be6";	
	colour[11] = "#4fe63b";	
	colour[12] = "#e63b3b";	
	colour[13] = "#ff5a00";	
	colour[14] = "#ff00de";	
	colour[15] = "#3b8fe6";		

	start();
	};
	
	
	// mix colors
	shuffle = function() {
		var arr = colour, n = arr.length, tempArr = [];
		for (var i = 0; i < n - 1; i++) {
			// The following line removes one random element from arr
			// and pushes it onto tempArr
			tempArr.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
		}
		// Push the remaining item onto tempArr
		tempArr.push(arr[0]);
		arr = tempArr;
		hidden = arr;
	};
	//-------------------------------------------------------------------------------------------------------

	// set navigation rules
	navArray = function() {

		//position = [];

		position[0] = [12, 1, 4, 3, 1, 0, 0];
		position[1] = [13, 2, 5, 0, 1, 0, 1];
		position[2] = [14, 3, 6, 1, 1, 0, 2];
		position[3] = [15, 0, 7, 2, 1, 0, 3];
		position[4] = [0, 5, 8, 7, 1, 1, 0];
		position[5] = [1, 6, 9, 4, 1, 1, 1];
		position[6] = [2, 7, 10, 5, 1, 1, 2];
		position[7] = [3, 4, 11, 6, 1, 1, 3];
		position[8] = [4, 9, 12, 11, 1, 2, 0];
		position[9] = [5, 10, 13, 8, 1, 2, 1];
		position[10] = [6, 11, 14, 9, 1, 2, 2];
		position[11] = [7, 8, 15, 10, 1, 2, 3];
		position[12] = [8, 13, 0, 15, 1, 3, 0];
		position[13] = [9, 14, 1, 12, 1, 3, 1];
		position[14] = [10, 15, 2, 13, 1, 3, 2];
		position[15] = [11, 12, 3, 14, 1, 3, 3];

	};
	//-------------------------------------------

	// navigation to next free card
	cursorPosition = function(imgxy) {
		win1.setImgxyz(imgxy);
		$('div#ImgG' + win1.getImgxyz()).fadeTo("fast", 0.5);
		return true;
	};
	start = function() {
		shuffle();
		navArray();
		$('div#points').html("Poäng: " + win1.getPoints());
		//$('div#status').html("");
		cursorPosition(2);
		// startposition in game
	};
	//Testa om kortet borta
	openNextPos = function(nextpos, p, xy) {
		var nextpos2 = position[nextpos][p];
		var nextpos3 = position[nextpos2][p];
		if (position[nextpos][4] === 1) {
			cursorPosition(nextpos);
		} else {

			rowNum = [];
			rowNum[0] = position[nextpos][xy];
			rowNum[1] = position[nextpos2][xy];
			rowNum[2] = position[nextpos3][xy];
			for (var j = 0; j < 4; j++) {
				for (var i = 0; i < 16; i++) {
					if (position[i][xy] === rowNum[j] && position[i][4] === 1) {
						cursorPosition(i);
						j = 4;
						break;
					}
				}
			}

		}

	};
	//----------------------------------------------
	testIfEqual = function() {
		//cards = 0;
		win1.setCards(0);
		var imgxyz = win1.getImgxyz();
		if (hidden[imgxyz] === hidden[win1.getSc1()]) {// if cards is equal
			$("#G" + imgxyz).css("backgroundColor", "");
			// color that should be shown
			$("#G" + win1.getSc1()).css("backgroundColor", "");
			// color that should be shown
			win1.setPairsPlus();
			win1.setPointsPlus();
			if (win1.getPairs() === 8) {
				//$('div#status').html("Game finished");
				$("#restartbutton").css("backgroundColor", "green");
				// now you restart game
			}

		} else {// rewind cards
			position[imgxyz][4] = 1;
			// rewind position to show
			position[win1.getSc1()][4] = 1;
			// put position to show
			$('div#ImgG' + imgxyz).fadeTo("fast", 0.5);
			// fade in kort image
			$('div#ImgG' + win1.getSc1()).fadeTo("fast", 1);
			// fade in kort image
			$("#G" + imgxyz).css("backgroundColor", "");
			// color should be shown
			$("#G" + win1.getSc1()).css("backgroundColor", "");
			// color should be shown
			win1.setPointsMinus();
		}
		$('div#points').html("Score: " + win1.getPoints());
	};
	//---------------------------------------------------
	// button press navigation
	$(document).keydown(function(key) {
		var imgxyz = win1.getImgxyz();
		// Test if position that you stood on is closed
		if (position[imgxyz][4] === 1) {
			$('div#ImgG' + imgxyz).fadeTo("fast", 1);
		}
		if (win1.getCards() < 2 && win1.getPairs() < 8) {
			// if first or second opened card and cards left to go to
			switch(parseInt(key.which,10)) {
				case 38:
					nextpos = position[imgxyz][0];
					openNextPos(nextpos, 0, 5);
					break;
				case 39:
					nextpos = position[imgxyz][1];
					openNextPos(nextpos, 1, 6);
					break;
				case 40:
					nextpos = position[imgxyz][2];
					openNextPos(nextpos, 2, 5);
					break;
				case 37:
					nextpos = position[imgxyz][3];
					openNextPos(nextpos, 3, 6);
					break;
				case 13:
					if (imgxyz !== win1.getSc1() && position[imgxyz][4] !== 0) {//controll that you dont press same again and not ready
						win1.setCardsPlus();
						$('div#ImgG' + imgxyz).fadeTo("fast", 0);
						// fade out kort image
						$("#G" + imgxyz).css("background-color", hidden[imgxyz]);
						// color that should be shown
						position[imgxyz][4] = 0;
						// put position to hide

						if (win1.getCards() === 1) {

							win1.setSc1(imgxyz);
							// save first card

						} else if (win1.getCards() === 2) {

							setTimeout(function() {
								testIfEqual();
							}, 2000);
						}

					}
					break;
				default:
					break;
			}

		} else if (win1.getPairs() === 8) {
			// if all cards solved
			// game solved restart again
			if (13 === parseInt(key.which, 10)) {
				restart();
			}

		}

	});

	restart = function() {
		$("#restartbutton").css("backgroundColor", "#cc0000");
		$('div.Image').fadeTo("fast", 1);
		setVar();
		win1.resetVars();
		startArray();
	};
	//setVar();
	//startArray();

	//});
	return {
		setVar : setVar,
		startArray : startArray,
	};

}(jQuery); 