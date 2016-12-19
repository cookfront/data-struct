function Node(data, prev, next) {
	this.data = data;
	this.prev = prev;
	this.next = next;
}

function DoubleLinkedList(dList) {
	this.head = new Node();

	if (dList) {
		for (var i = 0; i < dList.length; i++) {
			this.insert(dList[i]);
		}
	}
}

DoubleLinkedList.prototype = {
	insert: function(data, key) {
		var newNode = new Node(data);
		var prevNode = this.findPrevious(key);

		if (!this.isLast(prevNode)) {
			newNode.prev = prevNode;
			newNode.next = prevNode.next;
			newNode.next.prev = newNode;
			prevNode.next = newNode;
		} else {
			newNode.prev = prevNode;
			prevNode.next = newNode;
		}
		return newNode;
	},

	/**
	 * 根据key找到该节点的前驱元素
	 */
	findPrevious: function(key) {
		var prev = this.head;

		while (prev.next != null && prev.next.data !== key) {
			prev = prev.next;
		}

		return prev;
	},

	/**
	 * 是否为空
	 */
	isEmpty: function() {
		return this.head == null;
	},

	/**
	 * 某个节点是否为最后一个节点
	 */
	isLast: function(node) {
		return node.next == undefined;
	},

	/**
	 * 根据key查找节点
	 */
	find: function(key) {
		var curr = this.head;
		while (curr != null && curr.data !== key) {
			curr = curr.next;
		}
		return curr ? curr : false;
	},

	delete: function(key) {
		var prevNode = this.findPrevious(key);
		var tmpNode;
		var data;

		if (!this.isLast(prevNode)) {
			// 被删除节点
			tmpNode = prevNode.next;
			prevNode.next = tmpNode.next;
			tmpNode.next.prev = prevNode;
			data = tmpNode.data;
		}

		delete tmpNode;
		return data;
	}
};

var doubleList = new DoubleLinkedList([1, 2, 3]);
console.log(doubleList.delete(2));
console.log(doubleList);