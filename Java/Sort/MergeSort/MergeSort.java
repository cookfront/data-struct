/**
 * Created by cookfront on 2016/12/27.
 */
public class MergeSort {
    private static Comparable[] aux;

    public static void main(String[] args)
    {
        Integer[] nums = { 421, 1123, 2432, 12, 432124, 5332, 2151, 234223};
        sort(nums);
        assert isSorted(nums);
        show(nums);
    }

    public static void merge(Comparable[] arr, int low, int mid, int high)
    {
        int i = low, j = mid + 1;

        // 将arr[low...high]复制到aux[low...high]
        for (int k = low; k <= high; k++)
        {
            aux[k] = arr[k];
        }

        for (int k = low; k <= high; k++)
        {
            // 左半边已合并完
            if (i > mid)
            {
                arr[k] = aux[j++];
            }
            // 右半边已合并完
            else if (j > high)
            {
                arr[k] = aux[i++];
            }
            else if (less(aux[j], aux[i]))
            {
                arr[k] = aux[j++];
            }
            else
            {
                arr[k] = aux[i++];
            }
        }
    }

    /**
     * 插入排序算法
     *
     * @param arr 需要排序的数组
     */
    public static void sort(Comparable[] arr)
    {
        aux = new Comparable[arr.length];
        sort(arr, 0, arr.length - 1);
    }

    public static void sort(Comparable[] arr, int low, int high)
    {
        if (high <= low) {
            return;
        }
        int mid = low + (high - low) / 2;
        sort(arr, low, mid);
        sort(arr, mid + 1, high);
        merge(arr, low, mid, high);
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
