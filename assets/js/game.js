var timerCount = 0;


function startTimer(){
	timerCount = setTimeout(timesUp(){}, 10000);
}


function stopTimer(){
	clearTimeout(timerCount);
}

function timesUp(){
	
}