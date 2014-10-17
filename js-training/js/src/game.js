/*
0. Create a function for the game
1. Get array size (n should be even, number)
2. Create an array with size = n
3. 

*/

var guessGame = function() {
// to get the size for the matrix.
	var getMatrixSize = function() {
	
		do {
			var n = prompt('Introduce the size of the game (even number)');
			if (n==null){
				return 0;
				break;	
			}
			else {
			n = parseInt(n);
			}
		} while((n % 2) != 0);
		
		return n;
	};
// create the structure  for matrix
   var createMatrix = function(n){
	    var m = [];
		for( var i = 0; i < n; i ++){
			
			m[i]=[];
		}
		return m;
   }
   //Verify if all values of the matrix were guessed.
   var isMatrixCompleted = function(m){
		for (var i= 0; i< m.length; i++){
			for (var j= 0; j< m.length; j++){
				var element = m[i][j];				
				if (element =='*')
					return false;
			}
		}
		return true;
	}
   // show the matrix, after every guessing
	var showMatrix = function(m,n){
		var marray =[]
		
		for (var i = 0; i< n; i++){			
				for (var j = 0; j< n; j++){
					marray[j] = m[i][j];
					//console.log(m[i][j]);
				}			
			console.log(marray);
			
			document.write("<p>"+marray+"</p>"); 
		}
	}
	// generate the Temporal matrix with * as values.
    var generateTmpMatrix = function(n) {
		var m = [];
		for	(var j=0; j<n; j++) {
			m[j]  = []
			for(var i= 0; i < n; i++) {
				m[j][i] = '*';
			}
		}	
			return m;
	};
//Verify the values submitted is a number for X or Y, and if they are between the size.
	var validateValue = function(value,size){
		if (isNaN(value)){
		  return 0 ;
		}
		if(value>=0 && value<size){
			return value;
			 }
		else{
			return (size-1)
		}	 

   }
   // generate matrix the values with the characters
	var generateMatrix = function(n) {
	
		var m = createMatrix(n);
	
		for(var j=0; j<(n*n)/2; j++){
				var mchar = String.fromCharCode(65 + j);
				for(var i= 0; i < 2; i++) {
				
					var isCellReady = false;
					do {
						var idx = parseInt(Math.random() * n);
						var idy = parseInt(Math.random() * n);
						
						if(m[idy][idx] == undefined) {
							m[idy][idx] = mchar;
							isCellReady = true;
						}
							 
							
					} while (!isCellReady) // cell is NOT empty
				
					
				}
		}	//for	

		
		return m;
	};

	var size = getMatrixSize();
	if(size>0) {
		var matrix = generateMatrix(size);
		var tmpMatrix = generateTmpMatrix(size);
		
		do {
			
			console.log('TESTING matrix:', matrix);
			console.log('GAME matrix:', tmpMatrix);
			var rowfirst = validateValue(parseInt(prompt('X value,row for First guess? between 0 -'+size)),size);
			var firstGuess = validateValue(parseInt(prompt('Y value,column First guess?between 0 -'+size)),size);
			var rowSecond = validateValue(parseInt(prompt('X value,row for Second guess?between 0 -'+size)),size);
			var secondGuess = validateValue(parseInt(prompt('Y value, column for Second guess?between 0 -'+size)),size); 
			
			
				if (matrix[rowfirst][firstGuess] == matrix[rowSecond][secondGuess]) {
					console.log('YES!');
					tmpMatrix[rowfirst][firstGuess] = matrix[rowfirst][firstGuess];
					tmpMatrix[rowSecond][secondGuess] = matrix[rowSecond][secondGuess];
					showMatrix(tmpMatrix,size);
					// uncomment if you want to see the matrix with the characters.
					console.log("playing");
					showMatrix(matrix,size);
				}
				else{
					console.log('FAIL');
					showMatrix(tmpMatrix,size);
					// uncomment if you want to see the matrix with the characters.
					console.log("playing");
					showMatrix(matrix,size);
				}
			if(!isMatrixCompleted(tmpMatrix)){
				if(!confirm("Do you want continue the game?")) {
				break;
				}
				else{
				document.write("<p>Playing....</p>")
				}
			}	
		} while(!isMatrixCompleted(tmpMatrix));
		if(!isMatrixCompleted(tmpMatrix)){
			console.log("The Game was Cancelled");
			document.write("<p>The Game was Cancelled</p>")
		}
		else{
			console.log("You Win!!!");
			document.write("<p>You Win!!!</p>")
		}
		//console.log("You Win!!!");
		showMatrix(tmpMatrix);
		//console.log("playing");
		showMatrix(matrix);
	}  // the size is >0	
};

guessGame()



