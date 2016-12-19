function Node(value, parent) {
    this.value = value;
    this.parent = parent || null;
    this.rank = 0;
}

function DisjointSet() {
    this.nodes = [];
}

DisjointSet.prototype = {
    makeSet: function(data) {
        var len = data.length;
        if (data && len > 0) {
            for (var i = 0; i < len; i++) {
                this.nodes.push(new Node(data[i]));
            }
        }
    },

    findNodeByValue: function(value) {
        var item;
        for (var i = 0, len = this.nodes.length; i < len; i++) {
            item = this.nodes[i];
            if (item.value === value) {
                return item;
            }
        }

        return null;
    },

    find: function(value) {
        var node = this.findNodeByValue(value);

        if (!node) {
            return null;
        }

        while (node.parent != null) {
            node = node.parent;
        }

        return node;
    },

    union: function(value1, value2) {
        var root1 = this.find(value1);
        var root2 = this.find(value2);

        if (!root1 || !root2) {
            return null;
        }

        if (root1.rank > root2.rank) {
            root2.parent = root1;
        } else {
            if (root1.rank === root2.rank) {
                root2.rank++;
            }
            root1.parent = root2;
        }
    }
};

var set = new DisjointSet();
set.makeSet([1, 2, 3, 4, 5, 6, 7, 8]);
set.union(5, 6);
set.union(4, 5);
set.union(7, 8);
