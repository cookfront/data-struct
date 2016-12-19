function insertSort(arr) {
	var len = arr.length;

	for (var i = 1; i < len; i++) {
		var item = arr[i];
		for (var j = i - 1; j >= 0 && arr[j] > item; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = item;
	}

	return arr;
}

var arr = [10, 9, 19, 15, 12, 20];
arr = insertSort(arr);
console.log(arr);
