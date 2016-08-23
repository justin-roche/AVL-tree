(function(){
	
	function randArray(size){
		var a = [];

		for(var i = 0; i<size;i++){
			a.push(Math.floor(Math.random()*100));
		}
		console.log(a);
		return a; 

	}

	function Maybe(obj){

		this.obj = obj; 

		this.eval = function(){
			if(obj != 'undefined'){return obj;}
			else{return null;} 
		}

		this.maybe = function(accessor){
				if(this.obj != null){
					if (typeof this.obj[accessor] == 'function'){
						var v = obj[accessor]();
						return new Maybe(v);
					}
					else {
						var v = obj[accessor];
						return new Maybe(v);
					}
				}
				else{
					return this;
				}
			}
		}

	app.randArray = randArray; 
	app.Maybe= Maybe;

})()