var inputText, outputText, operatorEntered = false;
var inputStr="";
window.onload= function(){
  var keyPad = document.querySelectorAll('input[type="button"]');
  inputText = document.getElementById("inputPanel");
  outputText = document.getElementById("outputPanel");
  if(typeof document.addEventListener != "undefined"){
	for(var i=0; i<keyPad.length;i++){
		keyPad[i].addEventListener('click',function(e,val){displayText(e,val);},false);
	}
	
  }
  else if(typeof document.attachEvent != "undefined"){
	keyPad.attachEvent('onclick',function(e){
		e = event || window.event ; // in IE8, event comes as undefined, so this check
		displayText(e);
	});
  }
  else{
	keyPad['onclick'] = function(e){
		e = event || window.event ; // in IE8, event comes as undefined, so this check
		displayText(e);
	};
  }
};
function displayText(evt,val){
	var src = evt.srcElement || evt.target;
		var data = src.value;
		
		if(data == "C") {
			clearData(inputStr, inputText, outputText);
		}
		else if(data == "=") {
			inputText.innerHTML = outputText.innerHTML;
			clearData(inputStr, outputText);
			return;
			
		}
		else{
			
			var operatorAlreadyExists = operatorAtLast(inputStr) && symbolAnOperator(data);
			
			if(operatorAlreadyExists || (symbolAnOperator(data) && !inputStr)){
				return;
			}
			
			inputStr += data;
			inputText.innerHTML = inputStr;
			if(inputStr.length>1 && (data == "!" || !symbolAnOperator(data)) && containsOperator(inputStr)){
				userInput = inputStr;
				var expIndex = userInput.indexOf("^");
				if(expIndex != -1){
					var startIndex = 0;
					while ((index = userInput.indexOf("^", startIndex)) > -1) {
						userInput = handleExponent(userInput, index);
						startIndex = index + 1;
					}
				}
				var factIndex = userInput.indexOf("!");
				if(factIndex != -1){
					var startIndex = 0;
					while ((index = userInput.indexOf("!", startIndex)) > -1) {
						userInput = handleFactorial(userInput, index-1);
						startIndex = index + 1;
					}
				}
				var output = eval(userInput);
				outputText.innerHTML = output;
			}
		}
}

function clearData(field){
	var c=0;
	while(c < arguments.length){
		if(typeof arguments[c] == "object"){
			arguments[c].innerHTML = "";
		}else{
			inputStr = "";
		}
		c++;
	}
}

function getLastSymbol(inputStr){
	return inputStr.charAt(inputStr.length-1);
}

function containsOperator(inputStr){
	return inputStr.match(/[-+*\/%^!]/);
}

function symbolAnOperator(symbol){
	return "/*-+%^!".indexOf(symbol) != -1 ;
}

function operatorAtLast(inputStr){
	var lastSymbol = getLastSymbol(inputStr);
	return lastSymbol && symbolAnOperator(lastSymbol) && lastSymbol != "!";
}

function handleExponent(inputString, expIndex){
	var newStr = "";
	var expStr = inputString.substring(expIndex-1, expIndex+2)
	var numberToRepeat = Number(expStr[0]);
	var timesToRepeat = Number(expStr[2]);
	while(timesToRepeat > 0){
		newStr = newStr + numberToRepeat + "*";
		timesToRepeat--;
	}
	newStr = newStr.replace(/[*]+$/, "");
	inputString = inputString.replace(expStr,newStr);
	operatorEntered = false;
	return inputString;
}

function handleFactorial(inputString, index){
	var fact=1;
	var factStr = inputString.substring(index, index+2)
	var number =  Number(inputString[index]);
	while(number > 1){
		fact = fact * number;
		number--;
	}
	fact = ""+fact;
	inputString = inputString.replace(factStr,fact);
	operatorEntered = false;
	return inputString;
}
