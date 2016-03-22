function Node(data, next) {
	this.data = data;
	this.next = next;
}

function Stack() {
	// 头节点
	this.head = new Node();
}

Stack.prototype = {
	push: function(data) {
		var newNode = new Node(data);
		newNode.next = this.head.next;
		this.head.next = newNode;
		return newNode;
	},

	pop: function() {
		var delNode = this.head.next;
		var data = delNode.data;
		this.head.next = delNode.next;

		delete delNode;
		return data;
	},

	top: function() {
		return this.head.next;
	},

	isEmpty: function() {
		return this.head.next == undefined;
	}
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());
console.log(stack);
console.log(stack.top());