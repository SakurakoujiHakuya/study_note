function threeWayPartition(arr, low, high) {
    if (low >= high) return;
    
    let lt = low;      // 小于区的右边界
    let gt = high;     // 大于区的左边界
    let i = low + 1;   // 当前遍历指针
    const pivot = arr[low]; // 选择第一个元素作为基准
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            // 当前元素小于基准，放到小于区
            [arr[i], arr[lt]] = [arr[lt], arr[i]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            // 当前元素大于基准，放到大于区
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            // 当前元素等于基准，继续前进
            i++;
        }
    }
    
    // 返回等于区的边界
    return { lt: lt - 1, gt: gt + 1 };
}


function threeWayQuickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // 随机选择基准避免最坏情况
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        [arr[low], arr[randomIndex]] = [arr[randomIndex], arr[low]];
        
        const { lt, gt } = threeWayPartition(arr, low, high);
        
        // 递归排序小于区和大于区
        threeWayQuickSort(arr, low, lt);
        threeWayQuickSort(arr, gt, high);
    }
    return arr;
}