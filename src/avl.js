
(function(){

	function AVLTree(){

		var start = new Node();
		var Maybe = app.Maybe; 
		var drawStep = app.drawStep; 

		this.start = function(){
			return start;
		} 

		this.add = function(arr){
			if(Array.isArray(arr)){
				arr.forEach(function(v){
					treeTraverse(v,start,insert.bind(null,v));
				});
			} else {
				treeTraverse(arr,start,insert.bind(null,arr));
			}
		}

		this.remove = function(key){
			return treeTraverse(key,start,remove.bind(null,key));
		}

		function insert(key,parent,direction){
			var n = new Node(key);
			addChild(n,parent,direction);
			balance(n);
		}

		function Equality(node, node2){
			return node.v === node2.v;
		}

		function addChild(child,parent,direction){
				parent.children[direction] = child; 
				if(child) child.p = parent;
				parent.updateHeight();
		}

		function leftMost(node){
			while (node.left()){
				node = node.left();
			}
			return node; 
		}

		function remove(key,child){
				var P = child.p;
				var dir = Equality(P.left(),child)? 0: 1;  
				var R = child.right(), L = child.left();

				if(L.v!=null && R.v!=null){
					var S = leftMost(R);
					var sp = S.p; 
					sp.left(S.right());
					S.p = null; 
					addChild(S,P,dir);
					addChild(L,S,0);
					addChild(R,S,1);
					balance(sp);
					return child;
				} 
				else if(L.v == null){
						addChild(R,P,dir);
						return child;
				} 
				else if(R.v == null){
						addChild(L,P,dir);
						return child;
				}
				
				addChild(null,P,dir);
				return child; 
		}

		Node.prototype.left = function(child){
			if(typeof child == 'undefined'){
				if(this.v!=null){
					return this.children[0];
				}
				return null;
			} 
			return addChild(child,this,0);
		}

		Node.prototype.right = function(child){
			if(typeof child == 'undefined'){
				if(this.v!=null){
					return this.children[1];
				}
				return null;
			}
			return addChild(child,this,1);
		}

		Node.prototype.updateHeight = function(num){
			var l = this.left().v!=null? this.left().height : 0;
			var r = this.right().v!=null? this.right().height : 0;
			this.height = 1 + Math.max(l,r);
			if(this.p) this.p.updateHeight();
		}

		function Node(v){
			this.p = null;

			if(v){
				this.v = v;
				this.height = 1;
				this.children = [new Node(),new Node()];
			}
			else{
				this.v = null;
				this.height = 0;
			} 
			
		}

		function promote(promoted,demoted){
			
			var grandparent = demoted.p;

			if(grandparent == null){ //the start scenario
				start = promoted;
				promoted.p = null; 
			} else {
				if(Equality(grandparent.left(),demoted)){
					grandparent.left(promoted);
				} else {
					grandparent.right(promoted);
				}
			}
		}

		function treeTraverse(val,c,fn){ 
			drawStep('search',c);
			if(c.v == null){
				start = new Node(val);
				return;
			}
			else if(val === c.v){
				return fn(c,0);
			}
			else if(val>c.v){
				if(c.right().v == null){
					return fn(c,1); 
				}
				else {
					treeTraverse(val,c.right(),fn);
				}
			} 
			else if(val<c.v){
				if(c.left().v ==null){
					return fn(c,0); 
				} 
				else {
					treeTraverse(val,c.left(),fn);
				}
			}
		}
		
		function balance(node){

			if (node.v == null) return;

			app.drawStep('balance',node);

			do{

				var h_A = new Maybe(node).maybe('left').maybe('left').maybe('height').eval() || 0;
				var h_B= new Maybe(node).maybe('left').maybe('right').maybe('height').eval() || 0;
				var h_C= new Maybe(node).maybe('right').maybe('left').maybe('height').eval() || 0;
				var h_D = new Maybe(node).maybe('right').maybe('right').maybe('height').eval() || 0;
				
				var h_L = new Maybe(node).maybe('left').maybe('height').eval() || 0;
				var h_R = new Maybe(node).maybe('right').maybe('height').eval() || 0;

				if(h_R > h_L + 1 && h_D > h_C){
						rotateD(node);
						return;
				}
				if(h_R > h_L + 1 && h_D <= h_C) {
						rotateC(node);
						return;
				}
				if(h_L > h_R + 1 && h_A > h_B){
						rotateA(node);
						return;
				}
				if(h_L > h_R + 1 && h_A <= h_B) {
						rotateB(node);
						return;
				}

				node = node.p;

			} while(node)	
			
		}

		function rotateA(n){
			var X = n, L = n.left(), B = L.right();
			drawStep('rotate',X,L,B);

			promote(L, X);
			L.right(X); 

			X.left(B);
		}
		
		function rotateB(n){
			var X =n, L = X.left(), D = L.right();
			var D1 = new Maybe(D).maybe('left').eval(); 
			var D2 = new Maybe(D).maybe('right').eval();
			drawStep('rotate',X,L,D);

			promote(D,X);
			D.right(X);

			D.left(L); 
			L.right(D1);
			X.left(D2); 
		}

		function rotateC(n){
			var X =n, R = X.right(), A = R.left();
			var A1 = new Maybe(A).maybe('left').eval();
			var A2 = new Maybe(A).maybe('right').eval();
			drawStep('rotate',X,R,A);

			promote(A,X);
			A.left(X);

			A.right(R);
			X.right(A1);
			R.left(A2); 
		}

		function rotateD(n){
			var X = n, R = X.right(), C = R.left();
			drawStep('rotate',X,R,C);

			promote(R, X);
			R.left(X); 

			X.right(C);
		}

	}

	app.AVLTree= AVLTree; 

})()

