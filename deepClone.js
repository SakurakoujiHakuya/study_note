function deepClone(source, hash = new WeakMap()) {
  // 1. 处理原始类型和函数（函数直接返回）
  if (source === null || typeof source !== 'object') {
    return source;
  }

  // 2. 处理循环引用
  if (hash.has(source)) {
    return hash.get(source);
  }

  // 3. 处理特殊对象类型
  // Date
  if (source instanceof Date) {
    return new Date(source);
  }
  // RegExp
  if (source instanceof RegExp) {
    return new RegExp(source);
  }
  // Set
  if (source instanceof Set) {
    const clonedSet = new Set();
    hash.set(source, clonedSet);
    source.forEach(value => {
      clonedSet.add(deepClone(value, hash));
    });
    return clonedSet;
  }
  // Map
  if (source instanceof Map) {
    const clonedMap = new Map();
    hash.set(source, clonedMap);
    source.forEach((value, key) => {
      clonedMap.set(key, deepClone(value, hash));
    });
    return clonedMap;
  }
  // ArrayBuffer
  if (source instanceof ArrayBuffer) {
    return source.slice(0);
  }
  // 其他 TypedArray 如 Int8Array, Uint8Array 等
  if (ArrayBuffer.isView(source)) {
    return new source.constructor(source.buffer.slice(0));
  }

  // 4. 处理普通对象和数组
  const target = new source.constructor(); // 保持原型链
  hash.set(source, target);

  // 5. 克隆Symbol属性
  const allKeys = [
    ...Object.getOwnPropertyNames(source),
    ...Object.getOwnPropertySymbols(source)
  ];

  for (const key of allKeys) {
    // 过滤掉原型上的属性
    if (source.propertyIsEnumerable(key)) {
      target[key] = deepClone(source[key], hash);
    }
  }

  return target;
}

// 测试用例
const testObj = {
  number: 1,
  string: 'hello',
  bool: true,
  null: null,
  undefined: undefined,
  symbol: Symbol('test'),
  array: [1, 2, { nested: 'value' }],
  date: new Date(),
  regex: /abc/gi,
  set: new Set([1, 2, 3]),
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  function: function(a, b) { return a + b; },
  object: { 
    nested: { 
      deep: 'value',
      circular: null // 稍后设置循环引用
    }
  },
  buffer: new Uint8Array([1, 2, 3, 4])
};

// 设置循环引用
testObj.object.nested.circular = testObj;
testObj.self = testObj;

// 执行深拷贝
const clonedObj = deepClone(testObj);

// 验证结果
console.log('原始对象:', testObj);
console.log('克隆对象:', clonedObj);

// 测试独立性
testObj.array.push(4);
testObj.object.nested.deep = 'changed';
testObj.date.setFullYear(2020);

console.log('修改后原始对象:', testObj);
console.log('克隆对象未受影响:', clonedObj);

// 验证循环引用
console.log('循环引用验证:', clonedObj.object.nested.circular === clonedObj); // true
console.log('循环引用验证:', clonedObj.self === clonedObj); // true

// 验证特殊类型
console.log('Date类型:', clonedObj.date instanceof Date); // true
console.log('RegExp类型:', clonedObj.regex instanceof RegExp); // true
console.log('Set类型:', clonedObj.set instanceof Set); // true
console.log('Map类型:', clonedObj.map instanceof Map); // true
console.log('函数:', clonedObj.function(1, 2)); // 3

// 验证原型链
console.log('原型链保持:', clonedObj.constructor === Object); // true


const myDeepClone = (source, hash = new WeakMap()) => {
    if(source === null || typeof source !== 'object') {
        return source;
    }
    if(hash.has(source)) {
        return hash.get(source);
    }
    
    if(source instanceof Date) {
        return new Date(source);
    }
    if(source instanceof RegExp) {
        return new RegExp(source);
    }

    if(source instanceof Set){
        const clonedSet = new Set()
        hash.set(source, clonedSet);
        source.forEach(value => {
            clonedSet.add(myDeepClone(value, hash));
        });
        return clonedSet;
    }
    if(source instanceof Map){
        const clonedMap = new Map()
        hash.set(source, clonedMap);
        source.forEach((value, key) => {
            clonedMap.set(key, myDeepClone(value, hash));
        });
        return clonedMap;
    }
    const target = new source.constructor();
    hash.set(source, target);

    const allKeys = [
        ...Object.getOwnPropertyNames(source),
        ...Object.getOwnPropertySymbols(source)
    ];
    for(const key of allKeys) {
        if(source.propertyIsEnumerable(key)) {
            target[key] = myDeepClone(source[key], hash);
        }
    }
    return target;

}