function Node(data, parent, left, right) {
    this.data = data;
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
    insert: function(val) {
        var newNode = new Node(val);
        if (this.root == null) {
            this.root = newNode;
            return;
        }

        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (val < current.data) {
                current = current.left;
                if (current == null) {
                    parent.left = newNode;
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = newNode;
                    break;
                }
            }
        }
    },

    /**
    * 删除
    */
    delete: function(data) {
        this.root = this.deleteNode(data, this.root);
    },

    deleteNode: function(data, treeNode) {
        if (treeNode == null) {
            return null;
        }
        if (data === treeNode.data) {
            // 没有子节点
            if (treeNode.left == null && treeNode.right == null) {
                return null;
            }
            if (treeNode.left == null) {
                return treeNode.right;
            }
            if (treeNode.right == null) {
                return treeNode.left;
            }
            var tmpNode = this.findMin(treeNode.right);
            treeNode.data = tmpNode.data;
            treeNode.right = this.deleteNode(tmpNode.data, treeNode.right);
            return treeNode;
        } else if (data < treeNode.data) {
            treeNode.left = this.deleteNode(data, treeNode.left);
            return treeNode;
        } else {
            treeNode.right = this.deleteNode(data, treeNode.right);
            return treeNode;
        }
    },

    /**
     * 先序遍历
     */
    preOrder: function(node) {
        if (node != null) {
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    },

    /**
     * 中序遍历
     */
    inOrder: function(node) {
        if (node != null) {
            this.preOrder(node.left);
            console.log(node.data);
            this.preOrder(node.right);
        }
    },

    /**
     * 后序遍历
     */
    postOrder: function(node) {
        if (node != null) {
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
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
