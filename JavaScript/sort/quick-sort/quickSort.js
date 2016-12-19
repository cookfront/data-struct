function swap (arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function median3 (arr, left, right) {
    var center = Math.floor((left + right) / 2);

    if (arr[left] > arr[center]) {
        swap(arr, left, center);
    }
    if (arr[left] > arr[right]) {
        swap(arr, left, right);
    }
    if (arr[center] > arr[right]) {
        swap(arr, center, right);
    }

    swap(arr, center, right - 1);
    return arr[right - 1];
}

function qSort (arr, left, right) {
    // 枢纽元
    var pivot = median3(arr, left, right);
    var i = left;
    var j = right - 1;

    while (i < j) {
        while (arr[++i] < pivot) {}
        while (arr[--j] > pivot) {}
        if (i < j) {
            swap(arr, i, j);
        } else {
            break;
        }
    }
    swap(arr, i, right - 1);
    if (left < i - 1) {
        qSort(arr, left, i - 1);
    }
    if (i + 1 < right) {
        qSort(arr, i + 1, right);
    }

    return arr;
}

function quickSort (arr) {
    return qSort(arr, 0, arr.length - 1);
}


var arr = [21, 53, 643, 654, 24, 892, 5338];
console.log(quickSort(arr));
