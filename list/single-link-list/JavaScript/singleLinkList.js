/**
 * 节点对象
 */
function Node(data, next) {
	this.data = data;
	this.next = next;
}

/**
 * 单链表对象
 */
function SingleLinkedList(sList) {
	// 头节点
	this.head = new Node();

	if (sList) {
		for (var i = 0; i < sList.length; i++) {
			this.insert(sList[i]);
		}
	}
}

SingleLinkedList.prototype = {
	/**
	 * 插入元素
	 */
	insert: function(data, key) {
		var newNode = new Node(data);
		var prevNode = this.findPrevious(key);

		newNode.next = prevNode.next;
		prevNode.next = newNode;
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

	/**
	 * 根据key删除节点
	 */
	delete: function(key) {
		var prevNode = this.findPrevious(key);
		var tmpNode;
		var data;
		if (!this.isLast(prevNode)) {
			tmpNode = prevNode.next;
			prevNode.next = tmpNode.next;
			data = tmpNode.data;
		}
		delete tmpNode;
		return data;
	}
};

var list = new SingleLinkedList([1, 2, 3]);
console.log(list.findPrevious(1));
console.log(list.delete(2));
console.log(list);