function Stack() {
	this.data = [];
	this.topOfStack = -1;
}

Stack.prototype = {
	push: function(data) {
		this.data[++this.topOfStack] = data;
	},

	pop: function() {
		if (this.isEmpty()) {
			return;
		}
		var data = this.data[this.topOfStack];
		this.topOfStack--;
		this.data.length = this.data.length - 1;
		return data;
	},

	top: function() {
		return this.data[this.topOfStack];
	},

	isEmpty: function() {
		return this.topOfStack === -1;
	}
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());
console.log(stack);
console.log(stack.top());
