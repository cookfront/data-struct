function Node() {
	this.values = [];
	this.children = [];
}

function BTree(degree) {
	this.degree = degree;
	this.root = new Node();
	this.root.leaf = true;
}

BTree.prototype = {
	insert: function(key) {
		var node = this.root;
		// 根节点满了进行分裂
		if (node.values.length === 2 * this.degree - 1) {
			var newNode = new Node();
			newNode.leaf = false;
			newNode.children[0] = node;
			this.root = newNode;
			this.splitChild(newNode, 0);
			this.insertNotFull(newNode, key);
		} else {
			this.insertNotFull(node, key);
		}
	},

	/**
	 * 分裂
	 */
	splitChild: function(node, i) {
		var newChild = new Node();
		var child = node.children[i];
		newChild.leaf = child.leaf;
		for (var j = 0; j < this.order; j++) {
			newChild.values[j] = child.values[j + this.degree];
		}
		// 如果不是叶节点，拷贝相应孩子
		if (!child.leaf) {
			for (var j = 0; j <= t; j++) {
				newChild.children[j] = child.children[j + this.degree];
			}
		}

		// 将`i`后的孩子节点后移
		for (var j = node.children.length - 1; j >= i + 1; j--) {
			node.children[j + 1] = node.children[j];
		}
		node.children[j + 1] = newChild;
		for (var j = node.values.length - 1; j >= i; j--) {
			node.values[j + 1] = node.values[j];
		}
		node.values[i] = child.values[this.degree];

		child.values.length = this.degree - 1;
		child.children.length = this.degree;
	},

	/**
	 * 插入不是满的节点
	 */
	insertNotFull: function(node, key) {
		var i = node.values.length;
		if (node.leaf) {
			while (i >= 0 && key < node.values[i]) {
				node.values[i + 1] = node.values[i];
				i--;
			}
			node.values[i + 1] = key;
		} else {
			while (i >= 0 && key < node.values[i]) {
				i--;
			}
			i = i + 1;
			if (node.children[i].values.length === 2 * this.degree - 1) {
				this.splitChild(node, i);
				if (key > node.values[i]) {
					i++;
				}
			}
			this.insertNotFull(node.children[i], key);
		}
	},

	/**
	 * B树搜索
	 */
	search: function(key, node) {
		node = node ? node : this.root;

		var i = 0;
		var keyLens = node.values.length;
		while (i < keyLens && key > node.values[i]) {
			i++;
		}
		if (i < keyLens && key === node.values[i]) {
			return [node, i];
		} else if (node.leaf) {
			return null;
		} else {
			return this.search(node.children[i], key);
		}
	},

	delete: function(key) {

	}
}
