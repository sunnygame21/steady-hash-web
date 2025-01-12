export const calculateUnitNum = (maxProfit: number) => {
  const sequence = [0.01, 0.02, 0.1, 0.2, 1, 2, 10, 20];
  let result = sequence[0];

  // 计算最大值的5倍和1/5
  const lowerLimit = maxProfit / 5;
  const upperLimit = maxProfit * 5;
  
  // 遍历单位序列，找到合适的单位
  for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] >= lowerLimit && sequence[i] <= upperLimit) {
          return sequence[i]; // 返回合适的单位（带百分号）
      }
  }

  return result;
};
