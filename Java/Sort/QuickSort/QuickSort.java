/**
 * Created by cookfront on 2016/12/27.
 */
public class QuickSort {
    public static void main(String[] args)
    {
        Integer[] nums = { 421, 1123, 2432, 12, 432124, 5332, 2151};
        sort(nums, 0, nums.length - 1);
        assert isSorted(nums);
        show(nums);
    }

    /**
     * 插入排序算法
     *
     * @param arr 需要排序的数组
     */
    public static void sort(Comparable[] arr, int low, int high)
    {
        if (high <= low)
        {
            return;
        }

        int j = partition(arr, low, high);
        sort(arr, low, j - 1);
        sort(arr, j + 1, high);
    }

    public static int partition(Comparable[] arr, int low, int high)
    {
        int i = low, j = high + 1;
        Comparable v = arr[low];
        while (true)
        {
            while (less(arr[++i], v))
            {
                if (i == high) {
                    break;
                }
            }
            while (less(v, arr[--j]))
            {
                if (j == low)
                {
                    break;
                }
            }
            if (i >= j)
            {
                break;
            }
            exchange(arr, i, j);
        }
        exchange(arr, low, j);
        return j;
    }

    /**
     * 交换数组中对应索引的两个值
     *
     * @param arr 需要交换的数组
     * @param i 索引
     * @param j 索引
     */
    public static void exchange(Comparable[] arr, int i, int j)
    {
        Comparable temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * 是否小于
     *
     * @param v
     * @param w
     * @return
     */
    public static boolean less(Comparable v, Comparable w)
    {
        return v.compareTo(w) < 0;
    }

    /**
     * 验证数组是否已经排序
     *
     * @param arr 需要验证的数组
     * @return
     */
    public static boolean isSorted(Comparable[] arr)
    {
        for (int i = 1; i < arr.length; i++)
        {
            if (less(arr[i], arr[i - 1]))
            {
                return false;
            }
        }
        return true;
    }

    /**
     * 打印数组
     *
     * @param arr
     */
    public static void show(Comparable[] arr)
    {
        for (int i = 0; i < arr.length; i++)
        {
            System.out.println(arr[i] + "");
        }
        System.out.println();
    }
}
