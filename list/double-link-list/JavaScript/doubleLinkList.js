function Node(data, prev, next) {
	this.data = data;
	this.prev = prev;
	this.next = next;
}

function DoubleLinkList(dList) {
	this.head = null;
	this.tail = null;

	if (dList) {
		for (var i = 0; i < dList.length; i++) {
			this.insert(dList[i]);
		}
	}
}

DoubleLinkList.prototype = {
	insert: function(data) {
		var newNode;

		if (this.head === null) {
			this.head = new Node(data);
			this.tail = this.head;
		} else {
			newNode = new Node(data);
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
	},

	delete: function(data) {

	}
};
