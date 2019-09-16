// varialbles
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const result = document.querySelector('.result');
// functions
document.querySelector('.calculator-container').addEventListener("click", function(event) {
	/*
	Launches a buttonClick() functions when clickeing on any html element inside the class.
	event is a default parameter of the call-back function.
	target is a property of the event and references to the clicked object. 
	*/

	buttonClick(event.target.innerText);
	console.log("Buffer is " + buffer);
	console.log("Running total is " + runningTotal);
	console.log("Operator is " + previousOperator);
});

function buttonClick(value) {
	//value тут параметр, который принимает форму event.target.innerHTML из кол-бек функции выше
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
}

function handleNumber(value) {
	//и тут тоже value параметр, который принимает форму event.target.innerHTML из кол-бек функции выше
	if (buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
	rerender();
}

function handleSymbol(value) {
	switch (value) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			previousOperator = null;
			break;
		case '=':
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal.toString();
			runningTotal = 0;

			break;
		case "←":
			if (buffer.length === 1) {
				buffer = "0";
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
		default:
			handleMath(value);
			break;
	}
	rerender();
}

function handleMath(value) {
	const intBuffer = parseInt(buffer);
	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}

	previousOperator = value;
	buffer = "0";
}

function flushOperation(intBuffer) {
	switch (previousOperator) {
		case "+":
			runningTotal += intBuffer;
			break;
		case "-":
			runningTotal -= intBuffer;
			break;
		case "×":
			runningTotal *= intBuffer;
			break;
		default:
			runningTotal /= intBuffer;
			break;
	}
}

function rerender() {
	result.innerText = buffer;
}