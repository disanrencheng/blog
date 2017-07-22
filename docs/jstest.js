var arr=['1','2',`3`,`4`,`5`];

var newArr=arr.splice(1,2,'6',7,8)// [`3`,`4`,`5`];
layer.open({
  title: false,
  type: 2,
  content:'1234'
});     
function you(i){
 i=i+10;
 return i
}
var me=new Function("i","you(i+10)")
console.log(me(10))