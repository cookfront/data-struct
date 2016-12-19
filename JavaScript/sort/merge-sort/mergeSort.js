function merge (left, right) {
    var result = [];
    var leftIndex = 0;
    var rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort (arr) {
    var len = arr.length;

    if (len <= 1) {
        return arr;
    }

    var middle = Math.floor(len / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

var arr = [21, 53, 643, 654, 24, 892, 5338];
console.log(mergeSort(arr));
