function Node(value, parent) {
	this.value = value;
	this.parent = parent || null;
	this.height = 0;
}

Node.prototype = {
	/**
	 * 是否为父节点的左节点
	 */
	isLeftChild: function() {
		return !!this.parent && this.parent.left === this;
	},

	/**
	 * 是否为父节点的右节点
	 */
	isRightChild: function() {
		return !!this.parent && this.parent.right === this;
	}
};

function AvlTree(comparator) {
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

AvlTree.prototype = {
	/**
	 * 插入
	 */
	insert: function(value) {
        if (this.root == null) {
            this.root = new Node(value);
            return this.root;
        }

        var newNode = null;
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

        if (newNode) {
        	this.balance(newNode.parent);
        }

        return newNode;
	},

	balance: function(node) {
		this.traverse(function(node) {
			var leftHeight = node.left ? node.left.height : -1;
			var rightHeight = node.right ? node.right.height : -1;

			// 旋转
			if (leftHeight - rightHeight > 1) {
				if (node.left.right && (!node.left.left || node.left.left.height < node.left.right.height)) {
					this.singleRotateWithLeft(node.left);
				}
				this.singleRotateWithRight(node);
			} else if (rightHeight - leftHeight > 1) {
				if (node.right.left && (!node.right.right || node.right.right < node.right.left.height)) {
					this.singleRotateWithRight(node.right);
				}
				this.singleRotateWithLeft(node);
			}

			// 计算高度
			leftHeight = node.left ? node.left.height : -1;
			rightHeight = node.right ? node.right.height : -1;
			node.height = Math.max(leftHeight, rightHeight) + 1;

			return node.parent;
		}, node);
	},

	traverse: function(traverseFunc, startNode, endNode) {
		node = startNode ? startNode : this.root;
		endNode = endNode ? endNode : null;
		while (node && node != endNode) {
			node = traverseFunc.call(this, node);
		}
	},

	/**
	 * 右旋转
	 */
	singleRotateWithRight: function(node) {
		if (node.isLeftChild()) {
			node.parent.left = node.left;
			node.left.parent = node.parent;
		} else if (node.isRightChild()) {
			node.parent.right = node.right;
			node.right.parent = node.parent;
		} else {
			this.root = node.left;
			this.root.parent = null;
		}

		var tmp = node.left;
		node.left = node.left.right;
		if (node.left) {
			node.left.parent = node;
		}
		tmp.right = node;
		node.parent = tmp;
	},

	/**
	 * 左旋转
	 */
	singleRotateWithLeft: function(node) {
		if (node.isLeftChild()) {
			node.parent.left = node.left;
			node.left.parent = node.parent;
		} else if (node.isRightChild()) {
			node.parent.right = node.right;
			node.right.parent = node.parent;
		} else {
			this.root = node.left;
			this.root.parent = null;
		}

		var tmp = node.right;
		node.right = node.right.left;
		if (node.right) {
			node.right.parent = node;
		}
		tmp.left = node;
		node.parent = tmp;
	},

	delete: function(value) {
		var retNode = null;

		this.traverse(function(node) {
			var retNode = null;
			if (this.comparator(node.value, value) > 0) {
				retNode = node.left;
			} else if (this.comparator(node.value, value) < 0) {
				retNode = node.right;
			} else {
				retValue = node.value;
				this.deleteNode(node);
			}
			return retNode; 
		});
	},

	deleteNode: function(node) {
		if (node.left != null || node.right != null) {
			var replacementNode;
			var balanceBegin;
			if (node.left != null) {
				replacementNode = this.findMax(node.left);
				if (replacementNode != node.left) {
					replacementNode.parent.right = replacementNode.left;
					if (replacementNode.left) {
						replacementNode.left.parent = replacementNode.parent;
					}
					replacementNode.left = node.left;
					replacementNode.left.parent = replacementNode;
					balanceBegin = replacementNode.parent;
				}
				replacementNode.parent = node.parent;
				replacementNode.right = node.right;
				if (replacementNode.right)
					replacementNode.right.parent = replacementNode;
				if (node == this.maxNode)
					this.maxNode = replacementNode;
			} else if (node.right != null) {
				replacementNode = this.findMin(node.right);
				if (replacementNode != node.right) {
					replacementNode.parent.left = replacementNode.right;
					if (replacementNode.right)
						replacementNode.right.parent = replacementNode.parent;
					replacementNode.right = node.right;
					replacementNode.right.parent = replacementNode;
					balanceBegin = replacementNode.parent;
				}
				replacementNode.parent = node.parent;
				replacementNode.left = node.left;
				if (replacementNode.left)
					replacementNode.left.parent = replacementNode;
				if (node == this.minNode)
					this.minNode = replacementNode;
			}

			// 更新删除节点父节点的子节点的指向
			if (node.isLeftChild()) {
				node.parent.left = replacementNode;
			} else if (node.isRightChild()) {
				node.parent.right = replacementNode;
			} else {
				this.root = replacementNode;
			}

			// Balance the tree
			this.balance(balanceBegin ? balanceBegin : replacementNode);
		} else {
			// 删除当前节点，并平衡父节点
			if (node.isLeftChild()) {
				node.parent.left = null;
				if (node == this.minNode) {
					this.minNode = node.parent;
				}
				this.balance(node.parent);
			} else if (node.isRightChild()) {
				node.parent.right = null;
				if (node == this.maxNode) {
					this.maxNode = node.parent;
				}
				this.balance(node.parent);
			} else {
				// 被删除节点为根节点
				this.clear();
			}
		}
	},

	clear: function() {
		this.root = null;
		this.minNode = null;
		this.maxNode = null;
	},

	findMin: function(rootNode) {
		if (!rootNode) {
			return this.minNode;
		}

		var minNode = rootNode;
		this.traverse(function(node) {
			var retNode = null;
			if (node.left) {
				minNode = node.left;
				retNode = node.left;
			}
			return retNode;
		}, rootNode);

		return minNode;
	},

	findMax: function(rootNode) {
		if (!rootNode) {
			return this.maxNode;
		}

		var maxNode = rootNode;
		this.traverse(function(node) {
			var retNode = null;
			if (node.right) {
				maxNode = node.right;
				retNode = node.right;
			}
			return retNode;
		}, rootNode);

		return maxNode;
	}
};

var tree = new AvlTree();
tree.insert(3);
tree.insert(2);
tree.insert(1);
console.log(tree);
