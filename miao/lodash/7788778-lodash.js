var x7788778 = {
 /* Arguments
array (Array): The array to process.
[size=1] (number): The length of each chunk
Returns
(Array): Returns the new array of chunks.
*/
  chunk: function(array, size=1) {
    let result = []
    for (let i = 0 ; i < array.length; i += size) {
      result.push(array.slice(i,i+size))
    }
  }


}


















}