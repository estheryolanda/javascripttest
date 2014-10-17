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
/*
function calculateAge(bornYear){
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
     console.log('ValR '+arguments[i])
     console.log('Val '+sum)
 }
 console.log('max '+ max);
 console.log('min '+ min);
 console.log('sum '+ sum);
 

}
//var max=0;  
var doOperations= function() {
    max=0;
    var numbers = arguments;
    //begin from the last to the first
    var getMax = function(nums,index){
        var currentNumber = nums[index];
        if (currentNumber > max)
            max= currentNumber;
        if(index==0) //index argument or nums
            return max;
        return getMax(nums,index - 1);
    };

    console.log('Max is ', getMax(numbers, numbers.length-1));
};



/*var getMin = function(nums){
    if(nums)
        return getMin(y);
};*/

var doOperations2= function() {
    min=999999;
    var numbers = arguments;

 var getMint = function(nums,index){
    var currentNumber = nums[index];
    if (currentNumber < min)
     min= currentNumber;
     if(index==0) //indice del argumento o nums,
     return min;
     return getMint(nums,index - 1);
 };

 console.log('Min is ', getMint(numbers, numbers.length-1));
};

var doOperations3= function() {
    min=0;
   var  sum = 0;

    var numbers = arguments;

    var getSum= function(nums,index){
        var currentNumber = nums[index];


        if(index==0) //indice del argumento o nums,
            return currentNumber = nums[index];
       // return getSum(nums,index - 1);
        return currentNumber+ getSum(nums,index-1);
    };

    console.log('Sum is ', getSum(numbers, numbers.length-1));
};