x7788778 = {
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

  concat : function(array,[values]) {
    
  }












}





















