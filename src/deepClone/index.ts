
const getTag = (v: any) => toString.call(v);
const isBaseValue = (v: any) => v === null || v === undefined || (typeof v !== 'object' && typeof v !== 'function')

const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'
const functionTag = '[object Function]'

const getKeys = (obj) => {
  const result = []
  for(const key in obj) {
    result.push(key)
  }
  Object.getOwnPropertySymbols(obj).forEach(key => {
    result.push(key)
  })
  return result
}

function deepClone(value: any,  parent?: any, stack = new WeakMap<any, any>()): any {
  let result;
  const tag = toString.call(value);

  if (isBaseValue(value)) {
    return value
  }

  if (stack.get(value)) {
    return stack.get(value)
  }

  if (Array.isArray(value)) {
    result = new Array(value.length)
  }

  if (tag === mapTag) {
    result = new Map()
  }

  if (tag === setTag) {
    result = new Set()
  }

  if (tag === objectTag) {
    result = {};
  }

  stack.set(value, result)
  switch (tag) {
    case boolTag:
    case dateTag:
    case errorTag:
    case numberTag:
    case stringTag:
      return new value.constructor(value);
    case symbolTag:
      return Symbol.prototype.valueOf.call(value)
    case functionTag:
      return parent ? value : {}
    case arrayTag:
      value.forEach((item, index) => {
        result[index] = deepClone(item, value, stack)
      });
      break
      
    case mapTag:
      value.forEach((item, key) => {
        result.set(key, deepClone(item, value, stack))
      });
      break
    case setTag:
      value.forEach((item, key) => {
        result.set(deepClone(item, value, stack))
      });
      break
    case objectTag:
      getKeys(value).forEach(key => {
        result[key] = deepClone(value[key], value, stack)
      })
      break
    default:
      break;
  }
  return result
}

export default deepClone