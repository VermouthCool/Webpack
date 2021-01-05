// import '@babel/polyfill' //转换高级的语法
import {sum} from './moudle1' 
import {sub} from './moudle2'
import jian from  './moudle3'
import ge from '../json/test.json'  //默认将引入的json转换为object
import '../css/index.less'
console.log(sum(10,20));
console.log(sub(1,2));
console.log(jian.mul(10,20));
console.log(jian.div(2,5));
console.log(ge,typeof ge);
setTimeout(()=>{
    console.log('jian');
},1000);
let mypromise = new Promise((resolve,reject)=>{
    resolve('haha');
})
mypromise.then((value)=>{
    console.log(value);
});
mypromise();
//这个文件用来汇总js模块、图片、css、mp3/4 json  作为webpack的入口文件
//webpack只管es6的模块化语法  其他的es6语法不处理  json引入解析