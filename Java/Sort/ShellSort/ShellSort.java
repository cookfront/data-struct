/**
 * Created by cookfront on 2016/12/23.
 */
import java.lang.Math;

public class ShellSort {
    public static void main(String[] args)
    {
        Integer[] nums = { 421, 1123, 2432, 12, 432124, 5332, 2151};
        sort(nums);
        assert isSorted(nums);
        show(nums);
    }

    /**
     * 插入排序算法
     *
     * @param arr 需要排序的数组
     */
    public static void sort(Comparable[] arr)
    {
        int len = arr.length;
        int increment, i, j;

        // 数组长度小于等于1时不需要排序
        if (len <= 1) {
            return;
        }

        // 增量
        for (increment = (int)Math.floor(len / 2); increment > 0; increment = (int)Math.floor(increment / 2))
        {
            for (i = increment; i < len; i++)
            {
                Comparable temp = arr[i];
                for (j = i; j > increment && less(arr[j], arr[j - increment]); j -= increment)
                {
                    arr[j] = arr[j - increment];
                }
                arr[j] = temp;
            }
        }
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
