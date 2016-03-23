function Node(data, next) {
	this.data = data;
	this.next = next;
}

function Queue() {
	this.front = null;
	this.rear = null;
	this.size = 0;
}

Queue.prototype = {
	isEmpty: function() {
		return this.size === 0;
	},

	clear: function() {
		this.front = null;
		this.rear = null;
		this.size = 0;
	},

	enQueue: function(elem) {
		var newNode = new Node(elem);
		if (this.front == null) {
			this.front = this.rear = newNode;
		} else {
			this.rear.next = newNode;
			this.rear = newNode;
		}
		this.size++;
	},

	deQueue: function() {
		var val;
		if (this.front) {
			val = this.front.data;
			this.front = this.front.next;
			// 队列为空
			if (this.front == null) {
				this.rear = null;
			}
			this.size--;
			return val;
		} else {
			return null;
		}
	}
};

var queue = new Queue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue)
