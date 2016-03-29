function Node(data, parent, left, right) {
    this.data = data;
    this.parent = parent || null;
    this.left = left;
    this.right = right;
}

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    /**
     * 根据key查找对应节点
     */
    find: function(key, treeNode) {
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
     * 找到二叉搜索树的最小值
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
     * 找到二叉搜索树的最大值
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

    /**
     * 插入
     */
    insert: function(val, treeNode) {
        treeNode = treeNode ? treeNode : this.root;
        if (this.root == null) {
            this.root = new Node(val);
            return this.root;
        }
        if (val < treeNode.data) {
            if (treeNode.left == undefined) {
                treeNode.left = new Node(val, treeNode);
                return treeNode.left;
            } else {
                return this.insert(val, treeNode.left);
            }
        } else if (val > treeNode.data) {
            if (treeNode.right == undefined) {
                treeNode.right = new Node(val, treeNode);
                return treeNode.right;
            } else {
                return this.insert(val, treeNode.right);
            }
        }
    },

    /**
     * 删除
     */
    delete: function(key, treeNode) {
        treeNode = treeNode ? treeNode : this.root;
        // 空树
        if (this.root == null) {
            return null;
        }

        var tmpNode;
        if (key < treeNode.data) {
            return this.delete(key, treeNode.left);
        } else if (key > treeNode.data) {
            return this.delete(key, treeNode.right);
        } else if (treeNode.left !== undefined && treeNode.right !== undefined) {
            tmpNode = this.findMin(treeNode.right);
            treeNode.data = tmpNode.data;
            this.delete(treeNode.data, treeNode.right);
        } else {
            if (treeNode.left == undefined && treeNode.right == undefined) {
                if (treeNode.data < treeNode.parent.data) {
                    treeNode.parent.left = undefined;
                } else {
                    treeNode.parent.right = undefined;
                }
            } else if (treeNode.left == undefined) {
                treeNode = treeNode.right;
            } else if (treeNode.right == undefined) {
                treeNode = treeNode.left;
            }
        }
    }
};

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(8);
tree.insert(14);
tree.insert(11);
tree.insert(12);
tree.insert(16);
tree.delete(14);
console.log(tree);
