var x7788778 = {
  //array============================================================
 /* Arguments
array (Array): The array to process.
[size=1] (number): The length of each chunk
Returns
(Array): Returns the new array of chunks.
*/
  chunk: function(array, size = 1) {
    let result = []
    for (let i = 0 ; i < array.length; i += size) {
      result.push(array.slice(i,i+size))
    }
    return result
  },
 compact: function(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      // if (array[i] != false) {   null != false <.true     
      if (array[i]) {     
        result.push(array[i])
      }
    }
  return result
  },
  concat : function(array,...values) {
    var l = values.length
    if (!l) {
      return array
    }
    for (let i = 0; i < l; i++) {
      if(typeof values[i] === "object") {
        array.push(...values[i])
      } else {
        array.push(values[i])
      }
    }
    return array
  },
  concat1 : function(array,...values) {

    return values.reduce(function(item,...values){
        typeof item === "object" ? array.push(...item) : array.push(item)
    },array)
  },
  //reduce遍历values如果如果每个项为一个对象即[Number]，push...【】表达式，否则直接push item
  /* ?????????????????????????????????????????????????
  concat: function() {
    var length = arguments.length;//参数个数
    if (!length) {//没有参数，返回空数组
      return [];
    }
    var args = Array(length - 1), //包含需要添加的数组或元素的数组
        array = arguments[0],//原数组
        index = length;//参数索引
  
    while (index--) {//遍历参数，将除了第一个参数的其他参数加入args中
      args[index - 1] = arguments[index];
    }
    //如果第一个参数是数组，先复制一份（这样就不会修改原数组），然后将args扁平化一级([1,[2,[3]]] => [1,2,[3]])之后添加进拷贝的数组中，并返回添加之后的数组
    //如果第一个参数不是数组，直接将其作为空数组的第一个元素（[array]）,然后将args扁平化一级([1,[2,[3]]] => [1,2,[3]])之后添加进该数组，并返回添加之后的数组
    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
  },
  */
 difference : function(array,...values) {
  let result = []
  var values = [].concat(...values)
  var l = values.length
  for (var i = 0; i < array.length; i++) {
    if(!values.includes(array[i])) {
      result.push(array[i])
    }
  }
//时间复杂度为n方，  
  return result
},
baseDifference : function (array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    // 有比较器时，改用支持比较器的arrayIncludesWith
    includes = arrayIncludesWith
    // 标识为不是普通比较
    isCommon = false
  }
  // 当比较的数值长度超过200个时，启用缓存
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    // 迭代器最终值
    const computed = iteratee == null ? value : iteratee(value)
    value = (comparator || value !== 0) ? value : 0
    // 普通比较，并且非NaN
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          // 如果有相等的元素，不必要继续遍历，回到最外层循环outer
          continue outer
        }
      }
      result.push(value)
    }
    // isCommon=false时，非普通比较，比较values里边是否存在computed
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
},
// differenceBy = function (array, ...values) {
//   // iteratee赋值为为最后一个参数
//   let iteratee = last(values)
//   // 如果没有iteratee
//   if (isArrayLikeObject(iteratee)) {
//     iteratee = undefined
//   }
//   return isArrayLikeObject(array)
//   // iteratee的作用见baseDifference里边
//     ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), iteratee)
//     : []
// },


// differenceBy2 : function(array, ...args) {
//   var res = []
//   var f 
//   if (typeof arguments[arguments.length-1]  === "function") {
//     f = arguments[arguments.length -1]
//     for(var i = 0,j = 1; i < array.length; i++) {
//       if(!f(arguments[j++]).includes(f(array[i]))){
//          res.push(array[i])
//       }
//     }
    
//   } else if (typeof arguments[arguments.length-1] === "string") {
    
//     f = this.property
//     var property = arguments[arguments.length -1]
//     for(var i = 0,j = 1; i < array.length; i++) {
//       if(!f(arguments[j++][property]).includes(f(array[i][property]))){
//          res.push(array[i])
//       }
//     }
//   }
//   return res
// },
differenceBy(array, ...args) {
  let iteratee = null
  if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      iteratee = args.pop()
  } else {
      iteratee = this.identity
  }
  iteratee = this.iteratee(iteratee)
  var ary = [].concat(...args).map(it => iteratee(it))
  return array.filter(item => {
      return !ary.includes(iteratee(item))
  })
},
differenceWith:function(array, val, comparator) {
  return array.filter(item => val.every(value => !comparator(value, item)))
},
/**
 * function(array, ...values) {
    if (Array.isArray(values[values.length - 1])) {
        return this.difference(array, ...values);
    }
    let iteratee = this.iteratee(values[values.length - 1])
    values.length -= 1;
    let that = this;
    return array.filter(function(item, index) {
        if (that.concat([], ...values).map(function(it, idx) {
                return iteratee(it);
            }).indexOf(iteratee(item)) == -1)
            return item
    })
}
}
 */
  first : function(ary){
    return ary[0]
  },
  indexOf : function(ary, val) {
    for(var i = 0; i < ary.length; i++) {
      if (ary[i] == val) {
        return i
      }
    }
    return -1
  },
  lastIndexOf: function(ary, value, fromIndex=ary.length-1){
    var l = ary.length
    for (var i = fromIndex ; i >=0; i--) {
      if(ary[i] === value) {
        return i
      }
    }
    return -1
  },
  findLastIndex : function(ary, predicate = this.identity, fromIndex = ary.length - 1) {
    predicate = this.iteratee(predicate)
    for(var i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i])) {
       return i
      }
    }
    return -1
  
  },
findIndex : function(ary, predicate = this.identity, fromIndex = 0) {
  predicate = this.iteratee(predicate)
  for(var i = fromIndex ; i < ary.length; i++) {
    if (predicate(ary[i])) {
      return i
    }
  }
  return -1
},
nth:function(ary, n = 0){
  if(n >= 0) {
    return ary[n]
  } else {
    return ary[ary.length + n]
  }
},

includes : function(ary, val , fromIndex = 0) {
  if(!ary) {
    throw console.error("请输入带有length属性的值类型")
  }
var count = 0
  if(Object.prototype.toString.call(ary) === "[object Array]" || typeof ary === "string") {
    for (var i = fromIndex; i < ary.length; i++) {
      if (val !== val) {                   //根据NaN ！==NaN的特性，
            if(ary[i] !== ary[i]){
              return true
            }
          } else {
            if(val.length) {
              for (var Vkey in val) {
                if (ary[i] === val[Vkey]) {
                  count++
                }
              }
              if(val.length === count) {
                return true
              }
            } else {
              if(ary[i] === val) {
                return true
              }
            }
          }
      }
      return false
  }
  if(typeof ary === "object") {
    for(var key in ary) {
      if (ary[key] === val) {
        return true
      
        } else {
          if (val !== val) {                   //根据NaN ！==NaN的特性，
            if(ary[key] !== ary[key]){
              return true
          }
        }
      }
    }
    return false
  }
},

// flatten : function (ary) {
//   var result = []
//   for (var i = 0; i < ary.length; i++) {
//     if (Array.insArray(aryp[i])) {
//       result.push(ary[i])
//     } else {
//       for (var j = 0; j < ary[i].length; i++){
//         result.push(aryp[i][j])
//       }
//     }
    
//   }
//   return result
// },


//将数组展转为内部展开开一层的样子
flatten : function (ary) {
  return [].concat(...ary)
},

flattenDeep : function (ary) {
 return this.flattenDepth(ary,Infinity)
},

flattenDepth : function(ary,depth = 1) {
  if (depth === 0) {
    return ary.slice()
  }
  var result = []
  for(var i = 0; i < ary.length; i++) {
    if(Array.isArray(ary[i])) {
      var tmp = this.flattenDepth(ary[i],depth-1)
      result = [...result, ...tmp]
    } else {
      result.push(ary[i])
    }
  }
  return result
},

fromPairs : function(ary) {
  var res = {}
  for(var key of ary) {
    res[key[0]] = key[1]
  }
  return res
},
drop : function(ary,n = 1){
  return ary.slice(n)
},
dropRight : function(ary,n = ary.length - 1){
  if(!ary.length){
    return []
  }
  return ary.slice(ary.length - n)
},
head :function(ary) {
  return ary[0]
},
iteratee : function(shorthand) {
  if(typeof shorthand === "string") {
    return this.matches(shorthand)
  }
  if(typeof shorthand === "array") {
    return this.matchesProperty(shorthand)
  }
  if(typeof shorthand === "object") {
    return this.property(shorthand)
  }
},
dropRightWhile : function (array, predicate) {
  predicate = iteratee(predicate)
  for (var i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i])) {
        return array.slice(0, i + 1)
      }
  }
},
initial: function(ary) {
  return ary.slice(0,ary.length - 1)
},
intersection:function (...arrays) {
  return intersectionBy(...arrays)
},

intersectionBy: function(...args,iteratee){
  return intersectionBy(...args,iteratee)
},
join: function(ary,separator=','){
  
  var res = ""
  var l = ary.length
  for(var i = 0; i < l -1; i++) {
    res += ary[i] + separator
  }
  
  return res + ary[i]
},
//~~~~~~~~~array==========================================================================================


//Math=================================================================================================
/**
 * array (Array): The array to iterate over.
[iteratee=_.identity] (Function): The iteratee invoked per element.
 */
sumBy : function(array,iteratee) {
  let result = 0
  for (let i = 0; i < array.length; i++) {
    result+=iteratee(array[i])
  }
  return result
},


sum : function (array) {
  return x7788778.sumBy(array,identity)
},

//~~~~~~~~~Math=============================================================================================



unary : function (f) {
  return function(values) {
    return f(values)
  }
},



negate : function (f) {
  return function(...args) {
    !f(...args)
  }
},

fill : function (ary, val,start = 0, end = ary.length) {
  for (let i = start; i < end; i++) {
    ary[i] = val    //每一个对象都指向同一个值
  }
  return ary
},

slice: function(ary,start,end){

  var result = []
  for (var i = start; i < end; i++) {
    result += ary[i]
    }
  
    return  result
},

filter: function (ary,test) {
  return array.reduce(function(result, item, index, ary) {
    if (test(item, index, ary)) {
      result.push(item)
    }
    return result
  },[])
},
map: function (array, mapper) {
  return array.reduce(function(acc, item, index, ary){
    result.push(mapper(item, index, ary))
    return result
  })
},

reduce: function(ary , reducer, initiaivalue) {
  for (var i = 0; i < ary.length; i++) {
    initiaivalue = reducer(ary[i],initiaivalue)
  }
  return initiaivalue
},


forEach : function(ary,iterator) {
  for (var i = 0; i < ary.length; i++) {
    if(iterator(ary[i],ary,i) === false) {
      break
    }
  }
},

//Util=================================================================================================
/**
 * .identity(value)
source npm package

This method returns the first argument it receives.

Since
0.1.0

Arguments
value (*): Any value.
Returns
(*): Returns value.
 */
identity : function(value) {
  return value
},
/**
 * Arguments
source (Object): The object of property values to match.
Returns
(Function): Returns the new spec function.
 */
matches: function (obj) {       
  // return function(ojbk) {
  //   for (var key in obj) {
      
  //     if(obj[key] !== ojbk[key]) {
  //       return false
  //     }
  //   }
  //   return true
  // }
  return obj => this.isMatch(obj,source)
},
//判断一个对象部分值是否匹配另一个对象。返回treu和false
matchesProperty : function(path, srcvalue){
  return function(obj) {
    return obj[path] === srcvalue
  }
},

// isMatch: function (object,source) {
//   if(!object) {
//     return false
//   }
//   for (var key in object) {
//     if (object[key] !== source[key]) {
//       if(typeof object[key] == "object" && typeof source[key] == "object") {
//         continue
//       }
//       return false
//     }
//   }
  
//   if(typeof object[key] === "object") {
//     for(var key2 in object[key]) {
//       if (object[key][key2] !== source[key][key2]) {
//         return false
//       }
//     }
//   }
//   return true
// },
isMatch : function(obj, source) {
  //遍历source下标
  for (var key in source) {
      //如果对应下标位置数据属于Object类型，递归
      if (source[key] instanceof Object) {
          return this.isMatch(obj[key], source[key])
        } else if (obj[key] !== source[key]) {
          //直到source对应下标数据不是Object类型的，对比相等性
          return false
        }
      }
      return true //摘自某同学
  },

 isMatchWidth : function(object, source, customizer) {
    for (var i in source) {
        if (!customizer(object[i], source[i], key, object, source)) return false
    }
    return true
},
property : function(name) {
  return function(obj) {
    return obj[name]
  }
},
propertyOf: function(object) {
  return function(name) {
    return object[name]
  }
},
//Util=======================================================================================================

//ISFUNCTION================================================================
after : function(n,func) {
  var c = 0
  return function(...args) {
    c++
    if (c >= n) {
      return func(...args)
    }
  } 
},
before : function(n,func) {
  var c = 0
  var result
  return function(...args) {
    c++
    if (c < n) {
      return result =  func(...args)
    }
    return result
  } 
},//再未来超过n次的时候，考虑返回什么值,这里将返回最后一次调用的值

ary : function(func , n = func.length) {
  return function(...args) {
    return func(...args.slice(0,n))  
  } 
},
flip : function (func) {
	return function(...args){
		return func(...args.reverse)
	}
},

spread2 : function(func) {
  return function(ary){
    return func(...args)
  }
},

spread : function(func) {
  return function(ary){
    return func.apply(null,ary)
  }
},

bind : function(func,thisArg,fixedArgs) {
  return function (...restArgs) {
    func.apply(thisArg,[...fixedArgs,...restArgs])
  }
},
//~~~~ISFUNCTION=======================================================================================================================

//ISObject=======================================================================================================================
assign : function(obj, ...args) {
  return  arsg.reduce()
},

/**
 * (object, ...sources) => {
    return sources.reduce((acc, cur) => {
        for (var [key, value] of Object.entries(cur)) acc[key] = value
        return acc
    }, object)
}
 */
/**object, ...sources) => 
 * sources.reduce((accumulator, currentValue) => 
 * (hohenheimsd.forEach(currentValue, (value, key) => 
 * accumulator[key] = value), accumulator), object */
//~~~~ISObject=======================================================================================================================

//ISLANG=======================================================================================================================
isObjectLike : function(value){
  return typeof value === "object" && value !== null
},
isObject : function(value){
  return value instanceof Object
},
isNumber : function(value) {
  return Object.prototype.toString.call(value) === "[object Number]" || typeof value === "number"
},
isFunction : function(value) {
  return Object.prototype.toString.call(value) === "[object Function]" || typeof value === "function"
},
isArray : function(value) {
  return Object.prototype.toString.call(value) === "[object Array]" || typeof value === "array"
},
isArrayLike : function(value) {
  return Object.prototype.toString.call(value) 
  === ("[object Array]"||"[object String]") || typeof value === ("array"||"string") //数组类
},
isArrayLikeObject : function(value) {
  return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object" //数组类
},
isNil : function(value){
  return value === undefined || value === null
},
isNull : function(value){
  return value === null
},
isString : function(value) {
  return Object.prototype.toString.call(value) === "[object String]" || typeof value === "string"
},
isRegExp : function(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]"
},
isBoolean : function(value) {
  return Object.prototype.toString.call(value) === "[object Boolean]" || typeof value === "boolean"
},
isLength : function(value) {
  return value.length > 0
},
last : function(ary) {
  if (!ary.length && typeof ary !== "array") {
    throw console.error(请输入数组);
  } else {
    return ary[ary.length - 1]
  }
},

// isNumber : function(value) {
//   return Object.prototype.toString.call(value) === "[object Number]" || typeof value === "number"
// },
// isNumber : function(value) {
//   return Object.prototype.toString.call(value) === "[object Number]" || typeof value === "number"
// },
// isNumber : function(value) {
//   return Object.prototype.toString.call(value) === "[object Number]" || typeof value === "number"
// },

//~~~~=======================================================================================================================







parse : function(){
  var i = 0

  return function parse(str) {
    i = 0
    return parseValue()
  }
  function parseValue(){
    var c = str[i]
    if(c === "{") {
      return parseObject()   
    }else if(c === "[") {
      return parseArray()
    }else if(c === '"') {
      return parseString()
    }else if(c === "t") {
      return parseTrue()
    }else if(c === "f") {
      return parseFalse()
    }else if(c === "n") {
      return parseNull()
    } else {
      return parseNumber()
    }
  }
  //{"a":1,"b":2}
  function parseObject(){    //读外部变量，不需要参数
    i++
    if(str[i] === "}") {
      return {}
    }
    var result = {}
    while(true){
      var key = parseString()        
      i++
      var value = parseValue()
      result[key] = value
      if (str[i] === ',') {
        i++
        continue
      } else if (str[i] === '}') {
        i++
        return result
      }
    }
  }
  function parseArray(){
    i++
    if(str[i] == "]") {
      return []
    }
    var result = []
    var val
    while(true){
      val = parseValue()
      result.push(val)
      if(str[i] === ',') {
        i++
        continue
      } else if(str[i] === ']') {
        i++
        return result
      }
    }

    }
  function parseString(){
    for (var j = i + 1; ;j++) {
      if(str[j] === '"') {
        break
      }
    }
    var result = str.slice(i + 1, j)
    i = j + 1
    return result
  }
  function parseTrue(){
    var token = str.slice(i,i+4)
    if(token === "true") {
      i = i + 4
      return true
    } else {
      throw new syntaxError("unexpected token at position" + i)
    }
  }
  function parseFalse(){
    var token = str.slice(i,i+5)
    if(token === "false") {
      i = i + 5
      return false
    } else {
      throw new syntaxError("unexpected token at position" + i)
    }
  }
  function parseNull(){
    var token = str.slice(i,i+4)
    if(token === "null") {
      i = i + 4
      return null
    } else {
      throw new syntaxError("unexpected token at position" + i)
    }
  }
  function isNumberChar(c) {
    if (c >= '0' && c <= '9') {
      return true
    }
    if(c === '.' || c === '+' || c ==='-' || c === 'e' || c === 'E') {
      return true
    }
    return false
  }
  function parseNumber() {
    var j = i
    while (isNumberChar(str[j])) {
      j++
    }
    var numString = str.slice(i, j)
    i = j
    return parseFloat(numString)
  }


}(),

stringify : function (value) {
  if (Array.isArray(value)) {
    return '[' + value.map(stringify).join(",") +']'
  } else if (typeof value === "object") {
    var result = '{'
    for (var k in value) {
      var v = value[k]
      result += `"${k}"` + ':' + stringify(v) + ','
    }
    result = result.slice(0, -1) + '}'
    return result         //最后记得返回
  } else if( typeof value === 'boolean'){
    if(value) {
      return 'true'
    } else {
      return 'false'
    }
  } else if (typeof val === 'number') {
    return number.toString()
  }
},

}






