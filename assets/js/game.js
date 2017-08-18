var timerCount = 0;
var timer = 10;

function startTimer(){
	timerCount = setInterval(countDown, 1000);
}

function countDown(){
	timer--;

	$('body').html("<h2>" + timer + "</h2>");
	console.log(timerCount);

	if(timer == 0){
		stopTimer();
	}
}

function stopTimer(){
	clearInterval(timerCount);
}

function timesUp(){

}

startTimer();