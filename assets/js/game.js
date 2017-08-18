// logical timer;
var timerCount = 0;
// count down timer
var timer = 10;
// Loop through randomAnswerSet while assigning answers to buttons 
var loop = 0;
// Assign answer to this value 
trueAnswer = "";

// holds questions and answers. True answer is always 0
var questions = [["What is 5 + 5", "10", "5", "15", "11"],["What is 6 + 5", "11", "5", "15", "10"]];

//display timer at 0 while not counting down
$('#timer').html("<h2>10</h2>");

getQuestion();

// Get and display questions
function getQuestion(){
	
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
	

	// get random question in 2D form
	questionSetMd = questions.splice(Math.round(Math.random() * (questions.length - 1)),1);
	//converts array from 2D to 1D
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
		 // remove the selected answer from the list so it cannot be choosen again
		 answerSet.splice(answerSet.indexOf(randomAnswerSet[i]),1);
	}

	// Input the answers into the buttons
	$(".answer").each(function(){
		$(this).text(randomAnswerSet[loop]);
		loop++;
	});

	startTimer();
}

 //Timer functions
function startTimer(){
	timerCount = setInterval(countDown, 1000);
}

function countDown(){
	timer--;

	// display countdown
	$('#timer').html("<h2>" + timer + "</h2>");

	if(timer == 0){
		stopTimer();
	}
}

//when timer and reset display to 0 
function stopTimer(){
	clearInterval(timerCount);
	$('#timer').html("<h2>10</h2>");
}

function timesUp(){

}

//button events

// Change button style on hover
$(".btn").hover(function(){
	$(this).addClass("btn-warning");
},function(){
	$(this).removeClass("btn-warning");
});


$(".btn").click(function(){
	if($(this).text() === trueAnswer){
		$(this).addClass("btn-success");
	}else{
		$(this).addClass("btn-danger");
	}

});