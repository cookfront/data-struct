function insertSort(arr) {
	var len = arr.length;
	var tmp;
	for (var i = 1; i < len; i++) {
		tmp = arr[i];
		for (var j = i; j > 0; j--) {
			if (tmp < arr[j - 1]) {
				arr[j] = arr[j - 1];
			} else {
				break;
			}
		}
		arr[j] = tmp;
	}
	return arr;
}

var arr = [10, 9, 19, 15, 12, 20];
arr = insertSort(arr);
console.log(arr);
