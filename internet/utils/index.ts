export function deepClone(obj, hash = new WeakMap()) {
  // 处理基本类型和null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理特殊对象类型
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
    const flags = obj.flags;
    const regex = new RegExp(obj.source, flags);
    regex.lastIndex = obj.lastIndex;
    return regex;
  }

  if (obj instanceof Set) {
    const clone = new Set();
    obj.forEach(val => clone.add(deepClone(val, hash)));
    return clone;
  }

  if (obj instanceof Map) {
    const clone = new Map();
    obj.forEach((value, key) => {
      clone.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clone;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 创建克隆对象（保持原型链）
  const clone = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  hash.set(obj, clone);

  // 递归复制属性（包含Symbol属性）
  Reflect.ownKeys(obj).forEach(key => {
    clone[key] = deepClone(obj[key], hash);
  });

  return clone;
}
/** 4位数递增 */
export const getNextSequence = () => {
  const key = 'marketingListTotal';
  // let counter = parseInt(localStorage.getItem(key) ?? '0') || 1;
  let counter = parseInt(localStorage.getItem(key) ?? '0') || 1;
  const paddedNum = String(counter).padStart(4, '0');
  // localStorage.setItem(key, String(counter + 1)); // 存储递增后的值
  return paddedNum;
};
/** 生成唯一id */
export const generate18DigitId = () => {
    // 获取当前时间戳（13位）
    const timestamp = Date.now();
    
    // 生成5位随机数（确保总长度为18位）
    const randomPart = Math.floor(Math.random() * 90000) + 10000;
    
    // 组合时间戳和随机数
    const id = `${timestamp}${randomPart}`;
    
    // 确保总长度为18位
    return id.slice(0, 18);
}