var MyMap = (function(){

  function myIndexOf(ary, val) {
    if (val !== val) {
      for (var i = 0 ; i < ary.length; i++) {
        if(ary[i] !== ary[i]) {
          return i
        }
      }
    } else {
      return ary.indexOf(val)
    }
  }
  function MyMap(maps){ //接收的东西是可迭代的东西，基础类型不可迭代，数组是可迭代的
    if(!(this instanceof MyMap)){
      return new MyMap(maps)
    }
    if(!Array.isArray(maps)){
      throw new Error("只能接收数组")
    }
    this._keys = []
    this._values = []
    for (var pair of maps) { //for of取值，for in 是取属性，再数组中即是下标，
      // this._keys.push(pair[0])
      // this._values.push(pair[1])
      this.set(pair[0],pair[1])
    }
  }
  Object.defineProperty(MyMap.prototype,"size",{
    get : function(){
      return this._keys.length
    }

  })
  MyMap.prototype = {
    get : function(key) {
      var idx = myIndexOf(this._keys, key) //原生myIndexOf找到下标,如果是NaN会得到-1
      //所以使用自己实现的myIndexOf，可以识别NaN
      if(idx >= 0) {
        return this._values[idx]
      } else {
        return undefined
      }
    },

    set : function (key, value) {
       var idx = myIndexOf(this._keys,key)//好处是确保key的唯一性，去重
       if(idx >= 0) {
         this._values[idx] = value
       } else {
         this._keys.push(key)
         this._values.push(value)
       }
       return this
    },
    has : function(key) {
      return myIndexOf(this._keys,key) >= 0
    },
    delete : function(key){
      var idx = myIndexOf(this._keys,key)
      if(idx >= 0) {
        this._keys.splice(idx,1)
        this._values.splice(idx,1)
      }
      return this
    },
    clear : function (){
      this._keys = []
      this._values = []
      return this
    },
    keys : function (){
      return this._keys
    },
    values : function (){
      return this._values
    },
    
  }
  return MyMap
  
  }())

var MySet = (function(){
  function MySet(ary) {
    this.ary = []
    if(Array.isArray(ary)) {
      for (var i = 0; i < ary.length; i++) {
        this.ary.push(ary[i])
    }
    // return this.ary
  }

}
// 	Object.defineProperty(MySet.prototype, 'size', {
//   get: function () {
//     return this.set.length
//   }
// })
Object.defineProperty(MySet.prototype, 'size', {
size : this.ary._length
})

MySet.prototype.add = function(val){
  
  if(arguments.length === 0) {
    if(this.ary._inclues(undefined)) {
      return this.ary
    }else {
      return this.ary[_length] = val
    }
  } 
  if(val) {
    return this.ary[_length] = val 
  }
}

MySet.prototype._length = function(val){
  if (typeof this.ary == false) {
    return 0
  }
  
  if (val){
  var count = 0
    while(this.ary[++count]){
    }
  }
  return count - 1
}
  
MySet.prototype._has = function(val) {
  if(arguments.length = 0) {
    return false
  }
  if(val){
    var count = 0
    while(this.ary[++count]) {
      if(this.ary[count] === val) {
        return true
    }
  }
}
  return false
}
MySet.prototype._delete = function(val) {
  if(!this.ary._has(val)) {
    return false
  } else {
    for (var i = 0; i < this.ary.length; i++) {
      if(this.ary[i] == val) {
        this.ary.splice(i,1)
        return true
      }
    }		
  }
}

MySet.prototype.entries = function() {
this.ary.reduce((res, item) => {
  res[item] = item
  return res
}, {})
}	

MySet.prototype._clear = function() {
this.ary = []
return this
}

MySet.prototype._forEach = function(action) {
  for (var i = 0; i < this.ary.length; i++) {
       action(this.ary[i])
  }	
}

  return MySet
}) 

