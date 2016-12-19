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
		return this.color === 'red';
	},

	/**
	 * 是否为黑节点
	 */
	isBlack: function() {
		return this.color === 'black';
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

	delete: function(value) {
		var node = this.find(value);
		if (node == null) return;

		// 删除节点左子树和右子树都不为空
		if (node.left != null && node.right != null) {
			var leftMaxNode = this.findMax(node.left);
			node.value = leftMaxNode.value;
			node = leftMaxNode;
		}

		var child = (node.right === null) ? node.left : node.right;
		if (node.isBlack()) {
			node.color = child.color;
			this.deleteCase1(node);
		}

		this.balancer.replaceNode(node, child);
		this.root.color = 'black';
	},

	deleteCase1: function(node) {
		if (node.parent != null) {
			this.deleteCase2(node);
		}
	},

	deleteCase2: function(node) {
		var sibling = node.sibling();

		if (sibling.isRed()) {
			node.parent.color = 'red';
			sibling.color = 'black';
			if (node.isLeftChild()) {
				this.leftRotate(node.parent);
			} else {
				this.rightRotate(node.parent);
			}
		}

		this.deleteCase3(node);
	},

	deleteCase3: function(node) {
		var sibling = node.sibling();

		if (node.parent.isBlack()
			&& sibling.isBlack()
			&& sibling.left.isBlack()
			&& sibling.right.isBlack()) {
			sibling.color = 'red';
			this.deleteCase1(node.parent);
		} else {
			this.deleteCase4(node);
		}
	},

	deleteCase4: function(node) {
		var sibling = node.sibling();

		if (node.parent.isRed()
			&& sibling.isBlack()
			&& sibling.left.isBlack()
			&& sibling.right.isBlack()) {
			sibling.color = 'red';
			node.parent.color = 'black';
		} else {
			this.deleteCase5(node);
		}
	},

	deleteCase5: function(node) {
		var sibling = node.sibling();

		if (node.isLeftChild()
			&& sibling.isBlack()
			&& sibling.left.isRed()
			&& sibling.right.isBlack()) {
			sibling.color = 'red';
			sibling.left.color = 'black';
			this.rightRotate(sibling);
		} else if (node.isRightChild()
			&& sibling.isBlack()
			&& sibling.left.isBlack()
			&& sibling.right.isRed()) {
			sibling.color = 'red';
			sibling.right.color = 'black';
			this.leftRotate(sibling);
		}

		this.deleteCase6(node);
	},

	deleteCase6: function(node) {
		var sibling = node.sibling();
		sibling.color = node.parent.color;
		node.parent.color = 'black';

		if (node.isLeftChild()) {
			sibling.right.color = 'black';
			this.leftRotate(node.parent);
		} else {
			sibling.left.color = 'black';
			this.rightRotate(node.parent);
		}
	},

	find: function(value, treeNode) {
		treeNode = treeNode ? treeNode : this.root;
        // 空树
        if (this.root == null) {
            return null;
        }

        if (key < treeNode.data) {
            return this.find(key, treeNode.left);
        } else if (key > treeNode.data) {
            return this.find(key, treeNode.right);
        } else {
            return treeNode;
        }
	},
	/**
     * 找到最小值
     */
    findMin: function(treeNode) {
        treeNode = treeNode ? treeNode : this.root;
        // 空树
        if (this.root == null) {
            return null;
        }

        if (treeNode.left == null) {
            return treeNode;
        } else {
            return this.findMin(treeNode.left);
        }
    },

    /**
     * 找到最大值
     */
    findMax: function(treeNode) {
        treeNode = treeNode ? treeNode : this.root;
        // 空树
        if (this.root == null) {
            return null;
        }

        if (treeNode.right == null) {
            return treeNode;
        } else {
            return this.findMax(treeNode.right);
        }
    },
};

var tree = new RedBlackTree();
tree.insert(11);
tree.insert(2);
tree.insert(1);
console.log(tree);
