function Node(data, parent, left, right) {
	this.data = data;
	this.parent = parent;
	this.left = left;
	this.right = right;
	this.height = null;
}

function AvlTree() {
	this.root = null;
}

AvlTree.prototype = {
	insert: function() {
		treeNode = treeNode ? treeNode : this.root;
        if (this.root == null) {
            this.root = new Node(val);
            this.root.height = 0;
            return this.root;
        }
        if (val < treeNode.data) {
            
        } else if (val > treeNode.data) {
            
        }
	},

	/**
	 * 节点高度
	 */
	height: function(node) {
		if (node) {
			return node.height;
		}
	},

	/**
	 * 左单旋转
	 */
	singleRotateWithLeft: function() {

	},

	/**
	 * 右单旋转
	 */
	singleRotateWithRight: function() {

	},

	/**
	 * 右－左单旋转
	 */
	doubleRotateWithLeft: function() {

	},

	/**
	 * 左－右单旋转
	 */
	doubleRotateWithRight: function() {

	},

	delete: function() {

	}
};
