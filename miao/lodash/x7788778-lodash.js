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

   
/*Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
 
Since
0.1.0

Arguments
array (Array): The array to compact.
Returns
(Array): Returns the new array of filtered values.
*/
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

/**Creates a new array concatenating array with any additional arrays and/or values.

Since
4.0.0

Arguments
array (Array): The array to concatenate.
[values] (...*): The values to concatenate.
Returns
(Array): Returns the new concatenated array. */

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

    
 difference2 : function(array,values) {
  let result = 0
  return values.reduce(function(result,item,ary){
    if (item === array[i]){
      result++
    }
  },[])
//时间复杂度为n方，
  return [result]
},
differenceBy : function(array, ...args) {
  var res = []
  var f 
  var p
  if (typeof arguments[arguments.length-1]  === "function") {
    f = arguments.pop()
  } else if (typeof arguments[arguments.length-1] === "String") {
    f = property
  }
  for(var i = 0; i < array.length; i++) {
    if(!f(...args).includes(f(array[i]))){
       res.push(array[i])

    }
  }

  return res


},

/**
 * function differenceBy(array, ...args) {
    let func
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
        func = gyqgyq.iteratee(args.pop())
    } else {
        func = gyqgyq.identity
    }
    args = gyqgyq.flattenDeep([...args])
    let newValue = args.map(it => func(it))
    return array.filter(item => !newValue.includes(func(item)))
}
 */

  indexOf : function(ary, val) {
    for(var i = 0; i < ary.length; i++) {
      if (ary[i] == val) {
        return i
      }
    }
    return -1
  },

/*
  includes : function(ary, val) {
    for(var i = 0; i < ary.length; i++){
      if (ary[i] !== ary[i]) {    //想法错误
        return true
      }else if (ary[i] == val) {
        return true
      }

    }
    return false
    
  },

*/
/*
includes : function(ary, val) {
  if (val !== val) {                   //根据NaN ！==NaN的特性，
    for (var i = 0; i < ary.length; i++) {  //
      if (ary[i] === ary[i]) {
        return true
      }

    }
    return false

  }
  return indexOf(ary, val) !== -1

},
*/
includes : function(ary, val) {
  if (val !== val) {                   //根据NaN ！==NaN的特性，
    
        return true
      }
      
  return indexOf(ary, val) !== -1
    
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
  var result = []
  for (var i = 0; i < ary.length; i++) {
    if (Array.isArray(ary[i])) {
      var temp = flattenDeep(ary[i])
      result = [...result,...temp]
    } else {
      result.push(ary[i])
    }
  }
  return result
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



//~~~~~~~~~array====================================================================


//Math=====================================================================
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

//~~~~~~~~~Math=====================================================================



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

  
    



fill : function (ary, val) {
  for (let i = 0; i < ary.length; i++) {
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





//Util======================================================================
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
  return function(ojbk) {
    for (var key in obj) {
      
      if(obj[key] !== ojbk[key]) {
        return false
      }
    }
    return true
  }
},
//判断一个对象部分值是否匹配另一个对象。


isMatch: function (object,source) {
  if(!object) {
    return false
  }
  for (var key in object) {
    if (object[key] !== source[key]) {
      if(typeof object[key] == "object" && typeof source[key] == "object") {
        continue
      }
      return false
    }
  }
  
  if(typeof object[key] === "object") {
    for(var key2 in object[key]) {
      if (object[key][key2] !== source[key][key2]) {
        return false
      }
    }
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


//==========================================================================

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
}

//~~~~ISFUNCTION================================================================
}



















