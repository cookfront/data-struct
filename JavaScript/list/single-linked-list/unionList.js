var SingleLinkedList = require('./singleLinkedList');

function unionList(aList, bList) {
	var cList = new SingleLinkedList();
	var aHead = aList.head.next;
	var bHead = bList.head.next;

	while (aHead && bHead) {
		if (aHead.data <= bHead.data) {
			if (!cList.find(aHead.data)) {
				cList.insert(aHead.data);
			}
			aHead = aHead.next;
		} else {
			if (!cList.find(bHead.data)) {
				cList.insert(bHead.data);
			}
			bHead = bHead.next;
		}
	}

	if (aHead) {
		while (aHead) {
			cList.insert(aHead.data);
			aHead = aHead.next;
		}
	}

	if (bHead) {
		while (bHead) {
			cList.insert(bHead.data);
			bHead = bHead.next;
		}
	}

	return cList;
}

module.exports = unionList;
var a = new SingleLinkedList([1, 3, 5 ,7]);
var b = new SingleLinkedList([2, 3, 4 ,5]);
console.log(unionList(a, b));
