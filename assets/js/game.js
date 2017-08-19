// logical timer;
var timerCount;
// count down timer
var timer = 10;
// Loop through randomAnswerSet while assigning answers to buttons 
var loop = 0;
// Assign answer to this value 
trueAnswer = "";

// holds questions and answers. True answer is always 0
var questions = [["What is 5 + 5", "10", "5", "15", "11"],["What is 6 + 5", "11", "3", "17", "20"]];

// Ensures all values are correctly set
reset();

// Get and display questions
function getQuestion(){
	// Hide next question button
	$("#next").addClass("hidden");

	// Holds the 2D array for the selected question
	var questionSetMd = [];
	// Used to hold the 1D information of the selected section from questions array
	var questionSet = [];
	// Holders the answers to be displayed
	var answerSet = [];
	// Holds the randomized answers
	var randomAnswerSet = [];
	// Original length of answerSet before splicing
	var length = 0;
	

	// Get random question in 2D form
	questionSetMd = questions.splice(Math.round(Math.random() * (questions.length - 1)),1);
	
	// Converts array from 2D to 1D
	for (var i = 0; i < questionSetMd[0].length; i++) {
		questionSet[i] = questionSetMd[0][i];
	}
	
	// Sets question in html
	$("#question").text(questionSet[0]);
	
	// Remove the question from the array to only leave answers
	answerSet = questionSet.splice(1, questionSet.length -1);
	trueAnswer = answerSet[0];
	length = answerSet.length;
	
	// Randomize answer order by selecting from answerSet and applying to randomAnswerSet
	for (var i = 0; i < length; i++) {

		 randomAnswerSet[i] = answerSet[(Math.round(Math.random() * (answerSet.length -1)))];
		 
		 // Remove the selected answer from the list so it cannot be choosen again
		 answerSet.splice(answerSet.indexOf(randomAnswerSet[i]),1);
	}

	// Input the answers into the buttons
	$(".answer").each(function(){
		$(this).text(randomAnswerSet[loop]);
		loop++;
	});

	// reset answer looper
	loop = 0;

	startTimer();
}

 //Timer functions
function startTimer(){
	timerCount = setInterval(countDown, 1000);
}

function countDown(){
	timer--;
	
	// Display countdown
	if(timer < 10){
		$('#timer').html("<h2> 0" + timer + "</h2>");
	}else{
		$('#timer').html("<h2>" + timer + "</h2>");
	}

	if(timer == 0){
		processAnswer(true);
	}
}

// When timer reaches 0 function is called
function processAnswer(timeEnd, guess=""){
	
	// Stop timer
	clearInterval(timerCount);

	// Disable answer buttons
	$(".answer").addClass("disabled");
	
	// Check if function is running due to timer reaching 0
	if(timeEnd){
		// Increase wrong score by 1
		$("#wrong").text(parseInt($("#wrong").text()) + 1);
		
		// Loop through all buttons with answer class
		$(".answer").each(function(){	
			checkAnswer(this, false);
		});
	
	}else{
		checkAnswer(guess, true);
	}

	// Show next question button
	$("#next").removeClass("hidden");

	// Calculate total games played
	calcTotal();
}

function checkAnswer(answer, clicked){
	// Set class based on answer
	if($(answer).text() === trueAnswer){
		
		$(answer).addClass("btn-success");
		
		// If button was clicked and correct
		if (clicked) {
			$("#correct").text(parseInt($("#correct").text()) + 1);
		}
	
	}else{
		
		$(answer).addClass("btn-danger");

		// If button was clicked and wrong
		if (clicked) {
			$("#wrong").text(parseInt($("#wrong").text()) + 1);
		}
	}
}

function calcTotal(){
	// Add wrong + correct scores to get total score
	$("#total").text(parseInt($("#wrong").text()) + parseInt($("#correct").text()));
}

// Reset buttons and timer
function reset(){
	
	// Reset answer button classes
	$(".answer").removeClass("disabled").removeClass("btn-danger").removeClass("btn-success");
	
	// Clear answer text
	$(".answer").text("");

	// Clear question text
	$("#question").text("");

	// Hide next question button
	$("#next").addClass("hidden");
	// Set timer display back to 10
	$('#timer').html("<h2>10</h2>");

	// Set timer back to 10
	timer = 10;

	getQuestion();
}

// Button events

// Change button style on hover
$(".answer").hover(function(){
	$(this).addClass("btn-warning");
},function(){
	$(this).removeClass("btn-warning");
});

// When clicking an answer call function
$(".answer").click(function(){
	processAnswer(false, this);
});

$("#next").click(reset);