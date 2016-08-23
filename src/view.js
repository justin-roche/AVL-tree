(function(){

	var tree = null;

	document.addEventListener("DOMContentLoaded", function(event) { 
  		init();
	});

	function init(){
		app.debug = true; 
		tree = new app.AVLTree();
		tree.add([1,2,3]);
		app.update(tree.start());
	}
	
	var lastNodes = [];
	function drawStep(type,...nodes){
		if (app.debug === true){
			draw();
		}

		function draw(){
			lastNodes.forEach(function(n){
				n.flag = null;
			})
			lastNodes = [];

			nodes.forEach(function(n){
				n.flag = type || null; 
				lastNodes.push(n);
			})

			debugger;
			app.update(tree.start());
			debugger;
		}
	}

	app.drawStep = drawStep; 

	app.flagColors = {
		balance: 'blue',
		recent: 'green',
		height: 'orange',
		search: 'red',
		rotate: 'purple',
	}

})()