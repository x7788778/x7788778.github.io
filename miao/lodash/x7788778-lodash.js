var x7788778 = {
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
      if (array[i] != false) {
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

  concat1 : function(array,...values) {
    var length = arguments.length
    if (!length) {
      
    }
    let result = []
    for (let i = 0; i < values.length; i++) {
       array.push(...valus[i])
    }
    return array
  },
  concat : function(array,...values) {
    return values.reduce(function(item,i,...values){
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
  let result = 0
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < values.length; j++){

      if (values[j] == array[i]) {
        result++

      }
    }
  }
//时间复杂度为n方，
  return [result]
},

 difference : function(array,values) {
  let result = 0
  return values.reduce(function(result,item,ary){
    if (item === array[i]){
      result++
    }
  },[])
//时间复杂度为n方，
  return [result]
},




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
unary : function(f) {
  return function(value) {
    return f(value)
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


    

  





}





















