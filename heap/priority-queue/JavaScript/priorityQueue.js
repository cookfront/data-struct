function PriorityQueue(comparator) {
	this.values = [];
	this.comparator = comparator || function(a, b) {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	};
}

PriorityQueue.prototype = {
	insert: function(value) {
		for (var i = this.values.length; this.comparator(this.values[this.parent(i)], value) > 0; i = this.parent(i)) {
			this.values[i] = this.values[this.parent(i)];
		}
		this.values[i] = value;
	},

	parent: function(index) {
		return parseInt(index / 2) - 1;
	},

	leftChild: function(index) {
		return 2 * index + 1;
	},

	rightChild: function(index) {
		return 2 * index + 2;
	},

	deleteMin: function() {
		var len = this.values.length;
		if (len === 0) {
			return null;
		}

		var minElement = this.values[0];
		var lastElement = this.values[len - 1];

		var childIndex;
		for (var i = 0; this.leftChild(i) < len; i = childIndex) {
			childIndex = this.leftChild(i);
			// 右孩子更小
			if (childIndex !== len && this.comparator(this.values[childIndex], this.values[childIndex + 1]) > 0) {
				childIndex++;
			}

			if (lastElement > this.values[childIndex]) {
				this.values[i] = this.values[childIndex];
			} else {
				break;
			}
		}
		this.values[i] = lastElement;
		this.values.length = len - 1;
		return minElement;
	}
};

var queue = new PriorityQueue();
queue.insert(13);
queue.insert(21);
queue.insert(16);
queue.insert(24);
queue.insert(31);
queue.insert(19);
queue.insert(68);
queue.insert(65);
queue.insert(26);
queue.insert(32);
var min = queue.deleteMin();
console.log(queue, min);
