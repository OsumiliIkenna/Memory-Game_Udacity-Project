/**
 * @description Array list holding all the cards
 */
let cardArrays = ['fa-diamond', 'fa-diamond',
                  'fa-bicycle', 'fa-bicycle',
                  'fa-bolt', 'fa-bolt',
                  'fa-bomb', 'fa-bomb',
                  'fa-cube', 'fa-cube',
                  'fa-anchor', 'fa-anchor',
                  'fa-paper-plane-o', 'fa-paper-plane-o',
                  'fa-leaf', 'fa-leaf',
                 ];

const KEYCODE = {
	TAB: 9,
	ESC: 27
};

const ENDGAMECOUNTER = 8;

/**
 *@description Declaring and initializing variables
 */
let moves = 0,
    match = 0,
    currentSeconds,
    second = 0,
    rank3stars = 10,
    rank2stars = 16,
    rank1stars = 20,
    setTime,
    matchedCount = 0,
    initialCheck = '',
    finalCheck = '',
    count = 0,
    previousTarget = null,
    previousFocusedElement;

/**
 * @description shuffles array(cardArrays) at random. Shuffle function from http://stackoverflow.com/a/2450976
 * @param {array} array
 * @returns {array} Shuffled array of cardArrays.
 */
let shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

/**
 * @description generate Cards dynamically
 * @param {HTML} HTML element
 * @returns {HTML} HTML element of all the cards.
 */
let generateCard = (card) => {
    return `<li class="card" data-name="fa ${card}"><i class="fa ${card}"></i></li>`;
};

/**
 * @description shuffle the list of cards using the provided "shuffle" function above, 
 * + loop through each dynamically generated cards and add each card to the page.
 * + Also, reset moves, matchedCount, timer and call function (addCardListener(), setTime() and showStar()).
 */
let initGame = () => {
    let dynamicCards = shuffle(cardArrays).map((cardArray) => {
        return generateCard(cardArray);
    });

    document.querySelector('.deck').innerHTML = dynamicCards.join(' ');

    document.querySelector('.card').classList.remove('show', 'open', 'match');

    //Resetting moves
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;

    //Initializing matched cards
    matchedCount = 0;

    //calling event listener function 
    addCardListener();

    //resetting and calling timer
    clearInterval(currentSeconds);
    second = 0;
    document.querySelector('.timer').innerHTML = second;

    //calling setTime function
    setTime();

    //calling showStar function 
    showStar();
};

/**
 * @description set rating based on the number of moves. 
 * + The game displays a star rating (from 1 to atleast 3) that reflects the player's performance.
 * + The number of moves needed to change the rating is defined by variables (rank1stars, rank2stars and rank3stars).
 */
let rating = (moves) => {
    if (moves > rank3stars && moves < rank2stars) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                document.querySelectorAll(".fa-star")[i].style.visibility = "collapse";
            }
        }
    } else if (moves > rank1stars) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                document.querySelectorAll(".fa-star")[i].style.visibility = "collapse";
            }
        }
    }
};

/**
 * @description Reseting the game
 */
$('.restart').bind('click', (isConfirmed) => {
    if (isConfirmed) {
        $('.rating').removeClass('fa fa-star').addClass('stars');
        initGame();
    }
});

/**
 * @description Setting the timer for the game and start timer when the number of moves is greater than or equal to 1
 */
setTime = () => {
    currentSeconds = setInterval(() => {
        document.querySelector('.timer').innerHTML = second;
        if (moves >= 1) {
            second = second + 1;
        }
    }, 1000);
};

/**
 * @description This function loops through all selected elements and add the matched cards.
 */
const matched = () => {
    const choice = document.querySelectorAll('.open.show');
    choice.forEach(card => {
        card.classList.add('match');
    });
};

/**
 * @description This function loops through all selected elements and remove the unmatched cards.
 */
const unmatched = () => {
    initialCheck = '';
    finalCheck = '';
    count = 0;
    previousTarget = null;

    const choice = document.querySelectorAll('.open.show');
    choice.forEach(card => {
        card.classList.remove('open', 'show');
    });
};

/**
 * @description set up the event listener for the cards. If a card is clicked:
 * + Also, call the cardOpen function and check that not more than two(2) cards are matched, call the modalScore
 * + if variable matchedCount is equal to 8 and display winnerMessage. Unmatch cards if not identical.
 */
let addCardListener = () => {
    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', (event) => {

            const isClicked = event.target;

            if (
                isClicked.nodeName === 'I' ||
                isClicked === previousTarget ||
                isClicked.classList.contains('open', 'show') ||
                isClicked.classList.contains('match')
            ) {
                return;
            }
            cardOpen(isClicked);
        });
    });
};

/** 
 * @description check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position 
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol 
 *    + increment the move counter and display it on the page 
 *    + call the cardOpen function which check that not more than two(2) cards are matched, call the modalScore
 *    + if variable matchedCount is equal to 8 and display winnerMessage.
 */
let cardOpen = (isClicked) => {
    if (count < 2) {
        count++;
        if (count === 1) {
            initialCheck = isClicked.dataset.name;
            isClicked.classList.add('open', 'show');
        } else {
            finalCheck = isClicked.dataset.name;
            isClicked.classList.add('open', 'show');
        }
        if (initialCheck && finalCheck) {
            moves++;
            rating(moves);
            $('.moves').html(moves);

            if (initialCheck === finalCheck) {
                matchedCount++;
                setTimeout(matched, 700);
                modalScore();
            }
            setTimeout(unmatched, 700);
            //previousTarget = isClicked;
        }
    }
};

/**
 * @description Checks if all cards are successfully matched and call winnerMessage function and clear the timer.
 */
let modalScore = () => {
    if (matchedCount === ENDGAMECOUNTER) {
        winnerMessage();
        clearInterval(currentSeconds);
    }
};

/**
 * @description Loop through all the stars and make the hidden stars visible.
 */
let showStar = () => {
    [...document.querySelectorAll('.fa-star')].map(function(e) {
        e.style.visibility = 'visible';
    });
};

/**
 * @description Give focus to modal dialog and close the modal dialog when the ESC key is pressed.
 * + Also, listen to TAB and Shift_TAB keys and move focus within the dialog buttons.
 */
const modalKeyBoardListener = (modal, previousFocusedElement) => {

	Array.from(document.body.children).forEach(child => {
		if(child !== modal) {
			child.inert = true;
		}
	});

	modal.classList.add('opened');

	// Find all focusable children
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    let firstTabStop = focusableElements[0];
    let lastTabStop = focusableElements[focusableElements.length - 1];
    firstTabStop.focus();

	document.addEventListener('keydown', (e) => {
		if(e.keyCode === KEYCODE.ESC) {
			modal.style.display = "none";
        	initGame();
		}

		if (e.keyCode === KEYCODE.TAB) {

		    // SHIFT + TAB
		    if (e.shiftKey) {
		        if (document.activeElement === firstTabStop) {
		          e.preventDefault();
		          lastTabStop.focus();
		        }

		      // TAB
		    } else {
		        if (document.activeElement === lastTabStop) {
		          e.preventDefault();
		          firstTabStop.focus();
		        }
		    }    
		}        
	});
}

/**
 * @description when the whole cards are matched, display modal congratulation message, 
 * + number of moves made, stops the timer and display the time taking to complete the game and ratings.
 */
const winnerMessage = () => {
	// Get the modal
    const modal = document.querySelector('#myModal');

    previousFocusedElement = document.activeElement;

	modalKeyBoardListener(modal, previousFocusedElement);

    //make the bullet for the stars invisible when the congratulation message pops up.
    $('ul.stars li').css('list-style', 'none');

    // Get the button that opens the modal
    const btn = document.querySelector('#myBtn1');
    const btn2 = document.querySelector('#myBtn2');

    // Get the <span> element that closes the modal
    const span = document.querySelectorAll('.close')[0];

    if (matchedCount === ENDGAMECOUNTER) {

        const actualTime = document.querySelector('.timer').innerHTML;
        const starRating = document.querySelector('.stars').innerHTML;

        clearInterval(currentSeconds);

        document.querySelector('.newMoves').innerHTML = moves;
        document.querySelector('.newSecond').innerHTML = actualTime;
        document.querySelector('.starRating').innerHTML = starRating;

        modal.style.display = "block";
        //modal.classList.add('show');

        listen(btn, btn2, span, modal);

        Array.from(document.body.children).forEach(child => {
		if(child !== modal) {
			child.inert = false;
		}
		});

		previousFocusedElement.focus();
    }
};

/**
 * @description event listener for the displayed modal function(winnerMessage()).
 */
const listen = (btn, btn2, span, modal) => {
    btn.addEventListener('click', () => {
        modal.style.display = "none";
        initGame();
    });

    btn2.addEventListener('click', () => {
        modal.style.display = "none";
        initGame();
    });

    span.onclick = () => {
        modal.style.display = "none";
        initGame();
    };

    span.addEventListener('keypress', () => {
        modal.style.display = "none";
        initGame();
    });

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

/**
 * @description calling the initGame and start the game.
 */
initGame();

