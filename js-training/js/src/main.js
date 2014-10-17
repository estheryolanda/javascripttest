//main.js
function sayHello(name){
	document.write('Hello '+ name + '!');//escribir cambiar lecontenido del doc, eslinea decodscript
	console.log('Hello ' + name +'!');//recien lo poneossi estamosseguros
}

sayHello('Leo');
/*
var x=10
'x is '+ x++ + 'now,is '+ x
*/

//var age=''
/*function calculateAge(bornYear){
	age = 2014 - bornYear;
	return age;
}*/

function operations(arg1, arg2, arg3){
var max = arguments[0];;
var min = arguments[0];
var sum = 0;
 for ( var i=0; i< arguments.length;i++){
	if(arguments[i]<min)
		min = arguments[i];
	if(arguments[i]> max)
		max = arguments[i];
	sum+= arguments[i] +sum
 }
 console.log('max '+ max);
 console.log('min '+ min);
 console.log('sum '+ sum);
 
 
}
//var max=0;  wue tlasi en caso extremo hay 2operaciones k moficna a esat variable,etonces hacer
var doOperations= function() {
		max=0;
		var numbers = arguments;
		//getMax(numbers, numbers.length - 1);
		//getMin(numbers);
		//seemepzar del ultimo indice al primero pararecorrer
		var getMax = function(nums,index){
			var currentNumber = nums[index];
			if (currentNumber > max)
				max= currentNumber;
			if(index==0) //indice del argumento o nums, 
				return max;
			return getMax(nums,index - 1);
		};
		
		console.log('Max is ', getMax(numbers, numbers.length-1));
};

	


var getMin = function(nums){
	if(nums)
	return getMin(y);
};