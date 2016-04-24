function leftChild (i) {
    return 2 * i + 1;
}

function swap (arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function precDown (arr, i, len) {
    var index = i;
    var child;
    var tmp;

    for (tmp = arr[index]; leftChild(index) < len; index = child) {
        child = leftChild(index);

        if (child !== len - 1 && arr[child + 1] > arr[child]) {
            child++;
        }
        if (tmp < arr[child]) {
            arr[index] = arr[child];
        } else {
            break;
        }
    }
    arr[index] = tmp;
}

function heapSort (arr) {
    var len = arr.length;

    // build max heap
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        precDown(arr, i, len)
    }
    // delete max element
    for (let i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        precDown(arr, 0, i);
    }
    return arr;
}

var arr = [1, 42, 53, 2432, 422, 5443, 89];
console.log(heapSort(arr));