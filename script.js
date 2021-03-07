//
//Whack-A-Mole
//Reuben Clemens
//Due: 11/4/20
//

//This code is for the Whack-A-Mole project.
//It is about using functions for the OnClick events and Decrements involvment with setting up a timer.

const MIN = 1; //Constant Value that acts as the min for getting a random value in RandVal().
const MAX = 7; //Constant Value that acts as the max for getting a random value in RandVal().
startEnd = false; //Boolean Value that is used in the clickevent to prevent the function from going off until ready.
rand = ''; //Has a null value that will get defined in RandVal(). It will act as a global variable.
clicked = ''; //Has a null value that will get defined in clickevent(). It will act as a global variable.

score=0; // Has a integer value and is used to tell how much the user has scored from clicking moles.
time=30; // Has a integer value and is used to tell how much time is left from when the game has started.

/*
The RandVal() Function main purpose is to create a random integer from 1-6.
It will use it to switch the src of one of the image tags taht has the same value as rand.
Is called on by the button.
*/
function RandVal()
{
	document.getElementById("finalscore").innerHTML= ''; //Changes the text of finalscore to null.
	startEnd = true; // When the button is clicked, the startEnd value will change to true, causing clickevent() to be activated.
	rand = Math.floor(Math.random() * (MAX - MIN) + MIN); //Defines the rand value by a random integer using math.random.
	document.getElementById("TS").innerHTML= score; //Changes the text of 'TS' and replaces it with the score variable.
	document.getElementById(rand).src= 'images/dehaka.png'; //Changes the src to an image of the 'mole' on a randomly selected id.
	document.getElementById("button").disabled = true; //Will disable the button from being activated again.
}

/*
The clickevent() is used as the main function for the game.
Whenever the onlcick is activated on one of the images, it will call back to the parameter,
use an if statement to see if it has the same value as rand, and activate.
It will also change the rand value if it is the same as the previous time.
*/
function clickevent(TorF)
{
	//The startend value will only activate until it becomes true. This will happen when the button is pressed and calls RandVal().
	//Will allow the rest of the code inside to continue while true, but when time ends, will stop the function from running.
	if (startEnd) 
	{
		//This if statement is checking if the parameter value from the onclick is the same as the rand value.
		if (TorF == rand)
		{
			clicked=TorF; //Assigns the TorF value to clicked. clicked will act as a container of the last parameter clicked.
			score++; //Will increment the score once the if statement activates.
			RandVal() //Calls to RandVal to change the value of rand again.
		}
		//Will activate the while statement as long as clicked equals rand.
		//Clicked is the previous parameter value, so in this statement, it will make sure that the 'mole' will not be in the same place.
		while (clicked == rand)
		{
			RandVal() //Calls to RandVal to change the value of rand again.
		}
		document.getElementById(clicked).src= 'images/hole.png'; //Will change the src of img on clicked back to a hole.
	}
}

/*
The timer() is used as the countdown.
Is used in conjunction with timeDisplay().
*/
function timer()
{
	document.getElementById("TL").innerHTML= time; //Changes the text of 'TL' to the time value.
	timersubtract = setInterval(timeDisplay, 1000); //creates a timer event that will define timersubtract. It calls to timeDisplay and gives it each 1 second interval.
}

/*
The timeDisplay() will be used to display how much time the user has left to finish the game.
Also has the added ability of changing the color to signify they don't have much time left,
and to also restart the game once the countdown runs out.
*/
function timeDisplay()
{
	document.getElementById("TL").innerHTML= --time; //Changes the text of 'TL' to the time value, and also decrements its value.
	//The if statement will activate once it reachs 10 seconds and below. Will change the color of 'TL'.
	if (time <= 10)
	{
		document.getElementById("TL").style.color= 'red'; //Changes the color of 'TL' to red.
	}
	//Will activate once time equals 0.
	//It resets everything so the user can play again and tells them their final score.
	if (time == 0)
	{
		clearInterval(timersubtract); //Will clear the timer event timersubtract.
		document.getElementById("finalscore").innerHTML= 'Your final score was, ' + score + ', congrats!'; //Changes the 'finalscore' text to tell the user what they got.
		score=0; //Changes the score value to 0.
		time=30; //Changes the time value back to 30.
		startEnd=false; //Changes the startEnd value back to false to stop user from playing.
		document.getElementById("TL").style.color= 'black'; //Changes the color of 'TL' to black.
		document.getElementById(rand).src= 'images/hole.png'; //Changes the src of the randomly selected id to a hole.
		document.getElementById("button").disabled = false; //Activates the button.
		document.getElementById("button").innerHTML= 'Try Again!'; //Will change the text of button to signify to the user to try again.
	}
}