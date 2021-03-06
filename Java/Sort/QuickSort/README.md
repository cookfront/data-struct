# 快速排序

正如它的名字，快速排序是在时间中最快的已知排序算法，它的平均运行时间是`O(NlogN)`。快速排序也是一种分治的递归算法。将数组S排序的基本算法由下列简单的四步组成：

1. 如果S中元素个数是0或1，则返回
2. 取S中任一元素v，称之为枢纽元
3. 将`S - {v}`分成两个不相交的集合：`S1 = {x∈S - {v} | x ≤ v}`和`S2 = {x∈S - {v} | x ≥ v}`
4. 返回`{quicksort(S1)}`，继续v，继而`quicksort(S2)`

快速排序的效率依赖切分数组的效果，最好的情况是每次都正好能将数组对半分。一般改进的方法是通过三数中值来切分数组，例如：

> 一组N个数的中值是第`Math.ceil(N/2)`个最大的数。枢纽元的最好的选择是数组的中值。不幸的是，这很难算出，且会减慢快速排序的速度。因此一般的做法是使用左端、右端和中心位置上的三个元素的中值作为枢纽元。例如，输入为`8, 1, 4, 9, 6, 3, 5, 2, 7, 0`，它的左边元素是8，右边元素是0，中心位置为`Math.floor((left + right) / 2)`上的元素是6，于是枢纽元v=6。
