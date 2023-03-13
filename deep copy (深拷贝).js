const obj1 = {
    name: 'ifer',
    age: 18,
    s: Symbol(),
    fn: function () {
      return this
    },
    reg: /\d/,
    un: undefined,
    d: new Date(),
    n: 2n,
  }
  
  const obj2 = {}
  obj1.children = obj2
  obj2.parent = obj1
  
  // #1: m => new Map()
  const clone = (target, m = new Map()) => {
    const type = Object.prototype.toString.call(target)
  
    // 正则/日期
    if (/(regexp|date)/i.test(type)) return new target.constructor(target)
    // 错误对象
    if (/error/i.test(type)) return new target.constructor(target.message)
    // 函数
    if (/function/i.test(type))
      return new Function('return ' + target.toString())()
  
    // 【简单数据类型】
  
    if (target === null || typeof target !== 'object') return target
  
    console.log(
      'target: ',
      target,
      'm.get(target): ',
      m.get(target),
      '~~~~~~',
      'get'
    )
  
    // #2
    if (m.get(target)) return m.get(target)
  
    // 【主要是数组或对象】
    const result = new target.constructor()
  
    // #3
    m.set(target, result)
  
    // console.log('target: ', target, 'm.set(target): ', m, '~~~~~~', 'set')
  
    for (let attr in target) {
      // #4
      result[attr] = clone(target[attr], m)
    }
    return result
  }
  const o = clone(obj1)
  console.log(o)