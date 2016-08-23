(function(){
	
	var t = new app.AVLTree();

	t.add(randArray(100));

	app.update([t.start()])
	

	function randArray(size){
		var a = [];

		for(var i = 0; i<size;i++){
			a.push(Math.floor(Math.random()*100));
		}
		console.log(a);
		return a; 

	}

})()