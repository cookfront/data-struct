var SingleLinkedList = require('./singleLinkedList');

function intersectList(a, b) {
	var cList = new SingleLinkedList();
	var aHead = a.head.next;
	var bHead = b.head.next;

	while (aHead && bHead) {
		if (aHead.data < bHead.data) {
			aHead = aHead.next;
		} else if (aHead.data > bHead.data) {
			bHead = bHead.next;
		} else {
			cList.insert(aHead.data);
			aHead = aHead.next;
			bHead = bHead.next;
		}
	}

	return cList;
}

module.exports = intersectList;

var a = new SingleLinkedList([1, 3, 5 ,7]);
var b = new SingleLinkedList([2, 3, 4 ,5]);
console.log(intersectList(a, b));
