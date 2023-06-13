Math.avg = function () {
    let args = arguments;
    if (args.length === 0) return 0;

    var sum = 0;
    [...args].forEach(n => sum += n);

    return sum / args.length;
};

Math.highs = function (numbers, quantity) {
    var sortedNumbers = numbers.sort((a, b) => b - a);
    return sortedNumbers.slice(0, quantity);
};

Math.lows = function (numbers, quantity) {
    var sortedNumbers = numbers.sort((a, b) => a - b);
    return sortedNumbers.slice(0, quantity);
};