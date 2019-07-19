/**
 * 打乱算法 Fisher–Yates shuffle
 */
export function shuffle(arr) {
    let _arr = arr.slice(); //浅拷贝数据，不改变原数组
    for (let i = _arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let temp = _arr[i];
        _arr[i] = _arr[random];
        _arr[random] = temp;
    }
    return _arr;
}
