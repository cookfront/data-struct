function Node(value, parent) {
	this.value = value;
	this.parent = parent || null;
	this.color = 'red';
}

Node.prototype = {
	/**
	 * 节点的爷爷节点
	 */
	grandParent: function() {
		return this.parent == null ? null : this.parent.parent;
	},

	/**
	 * 节点的兄弟节点
	 */
	sibling: function() {
		if (this.parent == null) return null;
		return this.parent.left === this ? this.parent.right : this.parent.left;
	},

	/**
	 * 节点的叔叔节点
	 */
	uncle: function() {
		return this.parent == null ? null : this.parent.sibling();
	},

	/**
	 * 是否为红节点
	 */
	isRed: function() {
		console.log('xxxx');
		return this.color === 'red';
	},

	/**
	 * 是否为左节点
	 */
	isLeftChild: function() {
		return this.parent == null ? null : this.parent.left === this;
	},

	/**
	 * 是否为右节点
	 */
	isRightChild: function() {
		return this.parent == null ? null : this.parent.right === this;
	}
};

function RedBlackTree(comparator) {
	this.root = null;
	this.minNode = null;
	this.maxNode = null;
	this.comparator = comparator || function(a, b) {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	};
}

RedBlackTree.prototype = {
	insert: function(value) {
		var newNode = new Node(value);
		if (this.root == null) {
            this.root = newNode;
        } else {
        	this.traverse(function(node) {
				var retNode = null;
				if (this.comparator(node.value, value) > 0) {
					retNode = node.left;
					if (node.left == null) {
						newNode = new Node(value, node);
						node.left = newNode;
						if (node == this.minNode) {
							this.minNode = newNode;
						}
					}
				} else if (this.comparator(node.value, value) < 0) {
					retNode = node.right;
					if (node.right == null) {
						newNode = new Node(value, node);
						node.right = newNode;
						if (node == this.maxNode) {
							this.maxNode = newNode;
						}
					}
				}
				return retNode;
			});
        }

        if (newNode) {
        	this.insertBalance(newNode);
        }

        return newNode;
	},

	traverse: function(traverseFunc, startNode, endNode) {
		node = startNode ? startNode : this.root;
		endNode = endNode ? endNode : null;
		while (node && node != endNode) {
			node = traverseFunc.call(this, node);
		}
	},

	insertBalance: function(node) {
		var uncleNode;
		while (node.parent && node.parent.isRed()) {
			uncleNode = node.uncleNode;
			if (uncleNode && uncleNode.isRed()) {
				node.parent.color = 'black';
				uncleNode.color = 'black';
				node = node.grandParent();
			} else {
				if (node.parent && node.parent.isLeftChild()) {
					if (node.isRightChild()) {
						node = node.parent;
						this.leftRotate(node);
					}
					node.parent.color = 'black';
					node.grandParent().color = 'red';
					this.rightRotate(node.grandParent());
				} else {
					if (node.isLeftChild()) {
						node = node.parent;
						this.rightRotate(node);
					}
					node.parent.color = 'black';
					node.grandParent().color = 'red';
					this.leftRotate(node.grandParent());
				}
			}
		}
		this.root.color = 'black';
	},

	/**
	 * 左旋
	 */
	leftRotate: function(node) {
		var rightNode = node.right;
		this.replaceNode(node, rightNode);

		node.right = rightNode.left;
		if (node.right != null) {
			node.right.parent = node;
		}
		rightNode.left = node;
		node.parent = rightNode;
	},

	/**
	 * 右旋
	 */
	rightRotate: function(node) {
		var leftNode = node.left;
		this.replaceNode(node, leftNode);

		node.left = leftNode.right;
		if (node.left) {
			node.left.parent = node;
		}
		leftNode.right = node;
		node.parent = leftNode;
	},

	/**
	 * 更新父节点和替换节点的指针
	 */
	replaceNode: function(originalNode, replaceNode) {
		if (originalNode.parent == null) {
			this.root = replaceNode;
		} else {
			if (originalNode.isLeftChild()) {
				originalNode.parent.left = replaceNode;
			} else {
				originalNode.parent.right = replaceNode;
			}
		}
		if (replaceNode != null) {
			replaceNode.parent = originalNode.parent;
		}
	},

	deleteBalance: function() {

	},

	delete: function() {

	}
};

var tree = new RedBlackTree();
tree.insert(11);
tree.insert(2);
tree.insert(1);
console.log(tree);
