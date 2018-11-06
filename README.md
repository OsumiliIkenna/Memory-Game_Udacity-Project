# Memory Game Project

## Table of Contents

* [A Brief Description of the Game](#A Brief Description of the Game)
* [Array list](#Array list)
* [Shuffle Cards](#Shuffle Cards)
* [Star Rating](#Star Rating)
* [Restart Game](#Restart Game)
* [Timer](#Timer)
* [Match and Unmatch Cards](#Match and Unmatch Cards)
* [Event Listener for the Cards](#Event Listener for the Cards )
* [Modal Display](#Modal Display )

## A Brief Description of the Game

Memory games is a kind of game which require players to match similar cards. That is, players of this game needs to find a match for a card.
This game starts with a display of an array list of the cards which are shuffled at random and rendered to the web page. Star rating (from 1 to atleast 3) reflects the player's performance, the number of moves made is also taking into consideration and a displayed timer that starts counting with a click on any of the cards. Once the player wins the game,the timer stops. 
A modal appears to congratulate the player and ask if they want to play again. This also display how much time it took to win the game, and the star rating details.

This prject were built using HTML, CSS for styling and JavaScript to add interaction to the page.

## Array list
Array list holding all the cards

## Shuffle Cards
shuffles my array list at random.

## Star Rating
Set rating based on the number of moves. The game displays a star rating (from 1 to atleast 3) that reflects the player's performance.

## Restart Game
Reseting the game

## Timer
Set timer for the game and start timer when the number of moves is greater than or equal to 1

## Match and Unmatch Cards
Loops through all selected elements and add the matched cards. Also remove cards that do not match from the list and hide the card's symbol.

## Event Listener for the Cards
Set up the event listener for the cards. If a card is clicked.

## Modal Display
Display congratulation message if all cards are successfully matched.
