var timerCount = 0;
var timer = 10;


//  Timer functions
function startTimer(){
	timerCount = setInterval(countDown, 1000);
}

function countDown(){
	timer--;

	$('#timer').html("<h2>" + timer + "</h2>");

	if(timer == 0){
		stopTimer();
	}
}

function stopTimer(){
	clearInterval(timerCount);
	$('#timer').html("<h2>10</h2>");
}

function timesUp(){

}

$('#timer').html("<h2>10</h2>");

startTimer();

//button events

$(".btn").hover(function(){
	$(this).addClass("btn-warning");
},function(){
	$(this).removeClass("btn-warning");
});