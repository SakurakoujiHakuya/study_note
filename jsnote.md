# <center><font color=orange>JS核心基础</font></center>
## 一.入门
### 1.scipt代码编写位置
1.可以将js编写到网页内部的script标签
```javascript   
<script>
alert("哈哈！")
</script>
```
2.可以将js编写外部的js文件中，然后通过script标签进行引入
```javascript
<script src="./script/script.js"></script>
```
3.可以将js代码编写到指定属性中
```javascript
<button onclick="alert('你点我干嘛！')">点我一下</button>
<a href="javascript:alert(123);">超链接</a>
<a href="javascript:;">超链接</a>
```
### 2.字面量和变量
**1.字面量**
                - 字面量其实就是一个值，它所代表的含义就是它字面的意思
                - 比如：1 2 3 4 100 "hello" true null .....
                - 在js中所有的字面量都可以直接使用，但是直接使用字面量并不方便
**2.变量**
                - 变量可以用“存储”字面量
                - 并且变量中存储的字面量可以随意的修改
                - 通过变量可以对字面量进行描述，并且变量比较方便修改
### 3.标识符
在JS中，所有可以由我们自主命名的内容，都可以认为是一个标识符像 变量名 函数名 类名...
使用标识符需要遵循如下的命名规范：
                    1. 标识符只能含有字母、数字、下划线、$，且不能以数字开头
                    2. 标识符不能是JS中的关键字和保留字，也不建议使用内置的函数或类名作为变量名
                    3. 命名规范：
                        - 通常会使用驼峰命名法
                            - 首字母小写，每个单词开头大写
                            - maxlength --> maxLength
                            - borderleftwidth --> borderLeftWidth
                        - 类名会使用大驼峰命名法
                            - 首字母大写，每个单词开头大写
                            - maxlength --> MaxLength
                        - 常量的字母会全部大写
                            - MAX_LENGTH
## 二.数据类型
### 1.数值
 数值（Number）
                - 在JS中所有的整数和浮点数都是Number类型
                - JS中的数值并不是无限大的，当数值超过一定范围后会显示近似值
                - Infinity 是一个特殊的数值表示无穷
                - 所以在JS中进行一些精度比较高的运算时要十分注意
                - NaN 也是一个特殊的数值，表示非法的数值
大整数（BigInt）
                    - 大整数用来表示一些比较大的整数
                    - 大整数使用n结尾，它可以表示的数字范围是无限大
  其他进制的数字：
                    二进制 0b
                    八进制 0o
                    十六进制 0x
### 2.类型检查
`typeof` 运算符
                    - `typeof`用来检查不同的值的类型
                    - 它会根据不同的值返回不同的结果
```javascript
console.log(typeof a) // "number"
console.log(typeof b) // "bigint"
```
### 3.字符串
>
                字符串（String）
                    - 在JS中使用单引号或双引号来表示字符串
                    - 转义字符 \
                        \" --> "
                        \' --> '
                        \\ --> \\
                        \t --> 制表符
                        \n --> 换行
                    - 模板字符串
                        - 使用反单引号` 来表示模板字符串
                        - 模板字符串中可以嵌入变量
                    - 使用typeof检查一个字符串时会返回 "string"
### 4.其他的数据类型
1.布尔值（Boolean）
                - 布尔值主要用来进行逻辑判断
                - 布尔值只有两个true 和 false
                - 使用typeof检查一个布尔值时会返回 "boolean"

2.空值 （Null）
                - 空值用来表示空对象
                - 空值只有一个 null
                - 使用typeof检查一个空值时会返回"object"
                - 使用typeof无法检查空值

3.未定义（Undefined）
                - 当声明一个变量而没有赋值时，它的值就是Undefined
                - Undefined类型的值只有一个就是 undefined
                - 使用typeof检查一个Undefined类型的值时，会返回 "undefined"
            
4.符号（Symbol）
                - 用来创建一个唯一的标识    
                - 使用typeof检查符号时会返回 "symbol"

JS中原始值一共有七种
 1.Number
                2.BigInt
                3.String
                4.Boolean
                5.Null
                6.Undefined
                7.Symbol
                七种原始值是构成各种数据的基石
                    原始值在JS中是不可变类型，一旦创建就不能修改
### 5.类型转换-字符串
 类型转换指将一种数据类型转换为其他类型
            转换为字符串
**1.调用toString()方法将其他类型转换为字符串**
                    - 调用xxx的yyy方法
                        --> xxx.yyy()
                    - 由于null和undefined中没有toString()
                        所以对这两个东西调用toString()时会报错

**2.调用String()函数将其他类型转换为字符串**
                    - 调用xxx函数
                        --> xxx()
                    - 原理：
                        对于拥有toString()方法的值调用String()函数时，
                            实际上就是在调用toString()方法
                        对于null，则直接转换为"null"
                        对于undefined，直接转换为"undefined"
### 6.类型转换-数值
将其他的数据类型转换为数值
                **1.使用Number()函数来将其他类型转换为数值**
                    转换的情况：
                        - 字符串：
                            - 如果字符串是一个合法的数字，则会自动转换为对应的数字
                            - 如果字符串不是合法数字，则转换为**NaN**
                            - 如果字符串是空串或纯空格的字符串，则转换为0
                        - 布尔值：
                            - true转换为1，false转换为0
                        - null 转换为 0
                        - undefined 转换为 NaN
                专门用来将字符串转换为数值的两个方法           

**2.parseInt() —— 将一个字符串转换为一个整数**
                        - 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的整数
                        - 也可以使用parseInt()来对一个数字进行取整

**3.parseFloat() —— 将一个字符串转换为浮点数** 
                        - 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的小数
## 三.运算符
### 1.相等运算符
**==**
                - 相等运算符，用来比较两个值是否相等
                - 使用相等运算符比较两个不同类型的值时，
                    它会将其转换为相同的类型（通常转换为数值）然后再比较
                    类型转换后值相同也会返回true
                ==**- null和undefined进行相等比较时会返回true==
                ==- NaN不和任何值相等，包括它自身==

**===**
                - 全等运算符，用来比较两个值是否全等
                ==- 它不会进行自动的类型转换，如果两个值的类型不同直接返回false==
                - null和undefined进行全等比较时会返回false

**!=**
                - 不等，用来检查两个值是否不相等
                - 会自动的进行类型转换

**!==**
                - 不全等，比较两个值是否不全等
                - 不和自动的类型转换

## 四.流程控制
### 1.代码块
使用 {} 来创建代码块，代码块可以用来对代码进行分组，
                同一个代码中的代码就是同一组代码，一个代码块中的代码要么都执行要么都不执行
            **let 和 var**
                ==- 在JS中，使用let声明的变量具有块作用域==
                    在代码块中声明的变量无法在代码块的外部访问
                ==- 使用var声明的变量，不具有块作用域==
### 2.switch
```javascript
switch(表达式){
    case 表达式:
        代码...
        break
    case 表达式:
         代码...
        break
    case 表达式:
        代码...
        break
    case 表达式:
        代码...
        break
    default:
        代码...
        break
}
```

## 五.对象
### 1.对象的属性
**属性名**
- 通常属性名就是一个字符串，所以属性名可以是任何值，没有什么特殊要求
                    但是如果你的属性名太特殊了，不能直接使用，需要使用[]来设置
                    虽然如此，但是我们还是强烈建议属性名也按照标识符的规范命名

- 也可以使用符号（symbol）作为属性名，来添加属性
                    获取这种属性时，也必须使用symbol
                  使用symbol添加的属性，通常是那些不希望被外界访问的属性

- 使用[]去操作属性时，可以使用变量

**属性值**
- 对象的属性值可以是任意的数据类型，也可以是一个对象
使用typeof检查一个对象时，会返回object
```javascript
        obj.name = "孙悟空"
        // obj.if = "哈哈" // 不建议
        // obj.let = "嘻嘻"// 不建议
        // obj["1231312@#@!#!#!"] = "呵呵"// 不建议

        // let mySymbol = Symbol()
        // let newSymbol = Symbol()
        // // 使用symbol作为属性名
        // obj[mySymbol] = "通过symbol添加的属性"
        // console.log(obj[mySymbol])


        obj.age = 18
        obj["gender"] = "男"

        let str = "address"

        obj[str] = "花果山" // 等价于 obj["address"] = "花果山"

        obj.str = "哈哈" // 使用.的形式添加属性时，不能使用变量

        obj.a = 123
        obj.b = 'hello'
        obj.c = true
        obj.d = 123n
        obj.f = Object()
        obj.f.name = "猪八戒"
        obj.f.age = 28

        // console.log(obj.f.name)
        

        // console.log(obj.gender)
        // console.log(obj["gender"])
```
in 运算符
- 用来检查对象中是否含有某个属性
- 语法 属性名 in obj
- 如果有返回true，没有返回false
`console.log("name" in obj)`

### 2.对象的字面量
对象字面量
                - 可以直接使用{} 来创建对象
                - 使用{}所创建的对象，可以直接向对象中添加属性
                - 语法：
```
{
    属性名:属性值,
    [属性名]:属性值,
}
```  

```javascript
        let mySymbol = Symbol()

        let obj2 = {
            name:"孙悟空", 
            age:18,
            ["gender"]:"男",
            [mySymbol]:"特殊的属性",
            hello:{
                a:1,
                b:true
            }
        }

        console.log(obj)
        console.log(obj2)
```
### 3.枚举属性
枚举属性，指将对象中的所有的属性全部获取
```
            for-in语句
            - 语法：
                for(let propName in 对象){
                    语句...
                }
```
 - for-in的循环体会执行多次，有几个属性就会执行几次，每次执行时，都会将一个属性名赋值给我们所定义的变量
            
- 注意：并不是所有的属性都可以枚举，比如 使用符号添加的属性

```javascript
        let obj = {
            name:'孙悟空',
            age:18,
            gender:"男",
            address:"花果山",
            [Symbol()]:"测试的属性" // 符号添加的属性是不能枚举
        }

        for(let propName in obj){
            console.log(propName, obj[propName])
        }
```

### 4.可变类型
- 原始值都属于不可变类型，一旦创建就无法修改
- 在内存中不会创建重复的原始值

 - 对象属于可变类型
- 对象创建完成后，可以任意的添加删除修改对象中的属性
- 注意：
                - 当对两个对象进行相等或全等比较时，比较的是对象的内存地址
                - 如果有两个变量同时指向一个对象，
                    通过一个变量修改对象时，对另外一个变量也会产生影响


```javascript
<script>
        /* 
            - 原始值都属于不可变类型，一旦创建就无法修改
            - 在内存中不会创建重复的原始值

        */
        let a = 10 
        let b = 10
        a = 12 // 当我们为一个变量重新赋值时，绝对不会影响其他变量

        // console.log("a =", a)
        // console.log("b =", b)
        
        /* 
            - 对象属于可变类型
            - 对象创建完成后，可以任意的添加删除修改对象中的属性
            - 注意：
                - 当对两个对象进行相等或全等比较时，比较的是对象的内存地址
                - 如果有两个变量同时指向一个对象，
                    通过一个变量修改对象时，对另外一个变量也会产生影响
        */
       
        // let obj = {name:"孙悟空"}
        let obj = Object()
        obj.name = "孙悟空"
        obj.age = 18

        let obj2 = Object()
        let obj3 = Object()


        // console.log(obj2 == obj3) // false

        let obj4 = obj

        obj4.name = "猪八戒" // 当修改一个对象时，所有指向该对象的变量都会收到影响

        console.log("obj", obj)
        console.log("obj4", obj4)
        console.log(obj === obj4)
</script>
```

### 5.改变量和改对象
1.修改对象
- ==修改对象时，如果有其他变量指向该对象则所有指向该对象的变量都会受到影响==

2.修改变量
- 修改变量时，只会影响当前的变量
在使用变量存储对象时，很容易因为改变变量指向的对象，提高代码的复杂度
==所以通常情况下，声明存储对象的变量时会使用const==
注意：
==const只是禁止变量被重新赋值，对对象的修改没有任何影响==

## 六.函数
### 1.函数创建方式
                1.函数声明
                    function 函数名(){
                        语句...
                    }

                2.函数表达式
                    const 变量 = function(){
                        语句...
                    }

                3.箭头函数
                    () => {
                        语句...
                    }

```javascript
        function fn(){
            console.log("函数声明所定义的函数~")
        }

        const fn2 = function(){
            console.log("函数表达式")
        }

        const fn3 = () => {
            console.log("箭头函数")
        }

        const fn4 = () => console.log("箭头函数")
        

        console.log(typeof fn)
        console.log(typeof fn2)
        console.log(typeof fn3)
        console.log(typeof fn4)

        fn4()
```
### 2.参数
**1.形式参数**
- 在定义函数时，可以在函数中指定数量不等的形式参数（形参）
- 在函数中定义形参，就相当于在函数内部声明了对应的变量但是没有赋值
**2.实际参数**
- 在调用函数时，可以在函数的()传递数量不等的实参
- 实参会赋值给其对应的形参
- 参数：
1.如果实参和形参数量相同，则对应的实参赋值给对应的形参
2.如果实参多余形参，则多余的实参不会使用
3.如果形参多余实参，则多余的形参为undefined
**3.参数的类型**
- JS中不会检查参数的类型，可以传递任何类型的值作为参数

### 3.箭头函数的参数
当箭头函数中只有一个参数时，可以省略()
```javascript
        const fn2 = a => {
            console.log("a =", a);
        }
```
### 4.箭头函数返回值
箭头函数的返回值可以直接写在箭头后，如果直接在箭头后设置对象字面量为返回值时，对象字面量必须使用()括起来
```javascript
        const sum = (a, b) => a + b

        const fn = () => ({name:"孙悟空"})
```

### 5.作用域
**作用域（scope）**
- 作用域指的是一个变量的可见区域
- 作用域有两种：
**1.全局作用域**
                        - 全局作用域在网页运行时创建，在网页关闭时消耗
                        - 所有直接编写到script标签中的代码都位于全局作用域中
                        - 全局作用域中的变量是全局变量，可以在任意位置访问

**2.局部作用域**
- 块作用域
                            - 块作用域是一种局部作用域
                            - 块作用域在代码块执行时创建，代码块执行完毕它就销毁
                            - 在块作用域中声明的变量是局部变量，只能在块内部访问，外部无法访问
- 函数作用域
                - 函数作用域也是一种局部作用域
                - 函数作用域在函数调用时产生，调用结束后销毁
                - 函数每次调用都会产生一个全新的函数作用域
                - 在函数中定义的变量是局部变量，只能在函数内部访问，外部无法访问

### 6.作用域链
当我们使用一个变量时，
                    JS解释器会优先在当前作用域中寻找变量，
                        如果找到了则直接使用
                        如果没找到，则去上一层作用域中寻找，找到了则使用
                        如果没找到，则继续去上一层寻找，以此类推
                        如果一直到全局作用域都没找到，则报错 xxx is not defined

### 7.window对象
 Window对象
- 在浏览器中，浏览器为我们提供了一个window对象，可以直接访问
- window对象代表的是浏览器窗口，通过该对象可以对浏览器窗口进行各种操作
                    除此之外window对象还负责存储JS中的内置对象和浏览器的宿主对象
- window对象的属性可以通过window对象访问，也可以直接访问
- 函数就可以认为是window对象的方法
`window.a = 10 // 向window对象中添加的属性会自动成为全局变量`
var 用来声明变量，作用和let相同，但是var不具有块作用域
                - 在全局中使用var声明的变量，都会作为window对象的属性保存
                - 使用function声明的函数，都会作为window的方法保存
                - 使用let声明的变量不会存储在window对象中，而存在一个秘密的小地方（无法访问）
                ==- var虽然没有块作用域，但有函数作用域==
                ==在局部作用域中，如果没有使用var或let声明变量，则变量会自动成为window对象的属性 也就是全局变量==

### 8.提升
**1.变量的提升**
- 使用var声明的变量，它会在所有代码执行前被声明所以我们可以在变量声明前就访问变量
**2.函数的提升**
- 使用函数声明创建的函数，会在其他代码执行前被创建，所以我们可以在函数声明前调用函数
- let声明的变量实际也会提升，但是在赋值之前解释器禁止对该变量的访问
```javascript
<script>
            /* 
                变量的提升
                    - 使用var声明的变量，它会在所有代码执行前被声明
                        所以我们可以在变量声明前就访问变量

                函数的提升
                    - 使用函数声明创建的函数，会在其他代码执行前被创建
                        所以我们可以在函数声明前调用函数


                let声明的变量实际也会提升，但是在赋值之前解释器禁止对该变量的访问

            */

            console.log(b)

            let b = 10


            // fn()

            function fn(){
                alert("我是fn函数~")
            }

            // fn2()
            // var fn2 = function(){

            // }



            // console.log(a)

            var a = 10


            // a = 10 // window.a = 10
        </script>
```

### 9.立即执行函数
**立即执行函数（IIFE）**
                - 立即是一个匿名的函数，并它只会调用一次
                - 可以利用IIFE来创建一个一次性的函数作用域，避免变量冲突的问题
```javascript
        (function(){
            let a = 10
            console.log(111)
        }());


        (function(){
            let a = 20
            console.log(222)
        }())
```
### 10.this
- 函数在执行时，JS解析器每次都会传递进一个隐含的参数
- 这个参数就叫做 this
- this会指向一个对象
- this所指向的对象会根据函数调用方式的不同而不同
1.以函数形式调用时，this指向的是window
2.以方法的形式调用时，this指向的是调用方法的对象
- 通过this可以在方法中引用调用方法的对象

### 11.箭头函数的this
```
            箭头函数：
                ([参数]) => 返回值

            例子：
                无参箭头函数：() => 返回值
                一个参数的：a => 返回值
                多个参数的：(a, b) => 返回值

                只有一个语句的函数：() => 返回值
                只返回一个对象的函数：() => ({...})
                有多行语句的函数：() => {
                    ....    
                    return 返回值
                }
```
==箭头函数没有自己的this，它的this有外层作用域决定箭头函数的this和它的调用方式无关==

```javascript
<script>
            /* 
            箭头函数：
                ([参数]) => 返回值

            例子：
                无参箭头函数：() => 返回值
                一个参数的：a => 返回值
                多个参数的：(a, b) => 返回值

                只有一个语句的函数：() => 返回值
                只返回一个对象的函数：() => ({...})
                有多行语句的函数：() => {
                    ....    
                    return 返回值
                }

            箭头函数没有自己的this，它的this有外层作用域决定
            箭头函数的this和它的调用方式无关
        */

            function fn() {
                console.log("fn -->", this)
            }

            const fn2 = () => {
                console.log("fn2 -->", this) // 总是window
            }

            // fn() // window
            // fn2() // window

            const obj = {
                name:"孙悟空",
                fn, // fn:fn
                fn2,
                sayHello(){
                    console.log(this.name)

                    // function t(){
                    //     console.log("t -->", this)
                    // }
                    // t()

                    const t2 = () => {
                        console.log("t2 -->", this)
                    }

                    t2()
                }
            }

            // obj.fn() // obj
            // obj.fn2() // window

            obj.sayHello()
        </script>
```
### 12严格模式
JS运行代码的模式有两种：
- 正常模式
                    - 默认情况下代码都运行在正常模式中，
                        在正常模式，语法检查并不严格
                        它的原则是：能不报错的地方尽量不报错
                    - 这种处理方式导致代码的运行性能较差

- 严格模式
                    - 在严格模式下，语法检查变得严格
                        1.禁止一些语法
                        2.更容易报错
                        3.提升了性能

- 在开发中，应该尽量使用严格模式，
                    这样可以将一些隐藏的问题消灭在萌芽阶段，
                        同时也能提升代码的运行性能

```javascript
<script>
        "use strict" // 全局的严格模式

        let a = 10

        // console.log(a)

        function fn(){
            "use strict" // 函数的严格的模式
        }
</script>
```
## 七.面向对象
### 1.面向对象
面向对象编程（OOP）
1. 程序是干嘛的？
- 程序就是对现实世界的抽象（照片就是对人的抽象）
2. 对象是干嘛的？
- 一个事物抽象到程序中后就变成了对象
- 在程序的世界中，一切皆对象
3. 面向对象的编程
- 面向对象的编程指，程序中的所有操作都是通过对象来完成
- 做任何事情之前都需要先找到它的对象，然后通过对象来完成各种操作

### 2.类

**使用Object创建对象的问题：**
    1. 无法区分出不同类型的对象
    2. 不方便批量创建对象

**在JS中可以通过类（class）来解决这个问题：**
1. 类是对象模板，可以将对象中的属性和方法直接定义在类中
- 定义后，就可以直接通过类来创建对象
2. 通过同一个类创建的对象，我们称为同类对象
- 可以使用instanceof来检查一个对象是否是由某个类创建
- 如果某个对象是由某个类所创建，则我们称该对类的实例
```                
 语法：
     class 类名 {} // 类名要使用大驼峰命名
     const 类名 = class {}  
     
 通过类创建对象
     new 类()
```  

```javascript
<script>

            // Person类专门用来创建人的对象
            class Person{

            }

            // Dog类式专门用来创建狗的对象
            class Dog{

            }


            const p1 = new Person()  // 调用构造函数创建对象
            const p2 = new Person()

            const d1 = new Dog()
            const d2 = new Dog()

            console.log(p1 instanceof Person) // true
            console.log(d1 instanceof Person) // false



            const five = {
                // 添加属性
                name: "王老五",
                age: 48,
                height: 180,
                weight: 100,

                // 添加方法
                sleep() {
                    console.log(this.name + "睡觉了~")
                },

                eat() {
                    console.log(this.name + "吃饭了~")
                },
            }


            const yellow = {
                name: "大黄",
                age: 3,
                sleep() {
                    console.log(this.name + "睡觉了~")
                },

                eat() {
                    console.log(this.name + "吃饭了~")
                },
            }

            
        </script>
```

### 3.属性
类是创建对象的模板，要创建第一件事就是定义类
==类的代码块，默认就是严格模式，==
==类的代码块是用来设置对象的属性的，不是什么代码都能写==
```javascript
        class Person{
           name = "孙悟空" // Person的实例属性name p1.name
           age = 18       // 实例属性只能通过实例访问 p1.age
           static test = "test静态属性" // 使用static声明的属性，是静态属性（类属性） Person.test
           static hh = "静态属性"   // 静态属性只能通过类去访问 Person.hh
        }
```

### 4.方法
- 实例方法中this就是当前实例
- 静态方法（类方法） 通过类来调用 静态方法中this指向的是当前类
```javascript
<script>

        class Person{

            name = "孙悟空"

            // sayHello = function(){

            // } // 添加方法的一种方式

            sayHello(){
                console.log('大家好，我是' + this.name)
            } // 添加方法（实例方法） 实例方法中this就是当前实例

            static test(){
                console.log("我是静态方法", this)
            } // 静态方法（类方法） 通过类来调用 静态方法中this指向的是当前类

        }

        const p1 = new Person()

        // console.log(p1)

        Person.test()

        p1.sayHello()

    </script>
```

### 5.构造函数
```javascript
class Person{
            
            // 在类中可以添加一个特殊的方法constructor
            // 该方法我们称为构造函数（构造方法）
            // 构造函数会在我们调用类创建对象时执行
            constructor(name, age, gender){
                // console.log("构造函数执行了~", name, age, gender)
                // 可以在构造函数中，为实例属性进行赋值
                // 在构造函数中，this表示当前所创建的对象
                this.name = name
                this.age = age
                this.gender = gender

            }

        }
```

### 6.封装
面向对象的特点：==封装、继承和多态==
**封装**
- 对象就是一个用来存储不同属性的容器
- 对象不仅存储属性，还要负责数据的安全
- 直接添加到对象中的属性，并不安全，因为它们可以被任改
**如何确保数据的安全：**
1.私有化数据
            - 将需要保护的数据设置为私有，只能在类内部使用
2.提供setter和getter方法来开放对数据的操作
**属性设置私有，通过getter setter方法操作属的好处**
- 可以控制属性的读写权限
- 可以在方法中对属性的值进行
- 封装主要用来保证数据的安全
- **实现封装的方式：**
1.属性私有化 加#
2.通过getter和setter方法来操作属性
```
    get 属性名(){
        return this.#属性
    }
    set 属性名(参数){
        this.#属性 = 参数
    }
```

```javascript
            class Person {
                // #address = "花果山" // 实例使用#开头就变成了私有属性，私有属性只能在类内部访问

                #name
                #age
                #gender

                constructor(name, age, gender) {
                    this.#name = name
                    this.#age = age
                    this.#gender = gender
                }

                sayHello() {
                    console.log(this.#name)
                }

                // getter方法，用来读取属性
                getName(){
                    return this.#name
                }

                // setter方法，用来设置属性
                setName(name){
                    this.#name = name
                }

                getAge(){
                    return this.#age
                }

                setAge(age){

                    if(age >= 0){
                        this.#age = age
                    }
                }

                get gender(){
                    return this.#gender
                }

                set gender(gender){
                    this.#gender = gender
                }
            }
```

### 7.多态
- 在JS中不会检查参数的类型，所以这就意味着任何数据为参数传递
- 要调用某个函数，无需指定的类型，只要对象满足某些条件即可
- 如果一个东西走路像鸭子，叫起来像鸭子，那么它就是鸭子
- 多态为我们提供了灵活性
```javascript
<script>

        class Person{
            constructor(name){
                this.name = name
            }
        }

        class Dog{
            constructor(name){
                this.name = name
            }
        }

        class Test{

        }

        const dog = new Dog('旺财')
        const person = new Person("孙悟空")
        const test = new Test()

        // console.log(dog)
        // console.log(person)

       function sayHello(obj){
            // if(obj instanceof Person){
                console.log("Hello,"+obj.name)
            // }
       }

       sayHello(dog)

    </script>
```
### 8.继承
继承
- 可以通过extends关键来完成继承
- 当一个类继承另一个类时，就相当于将另一个类中的代了当前类中（简单理解）
- 继承发生时，被继承的类称为 父类（超类），继承的类类
- 通过继承可以减少重复的代码，并且可以在不修改一个对其进行扩展

==封装 —— 安全性
继承 —— 扩展性
多态 —— 灵活性==
```javascript
class Animal{
            constructor(name){
                this.name = name
            }

            sayHello(){
                console.log("动物在叫~")
            }
        }

        class Dog extends Animal{
            
        }
```


**继承**
- 通过继承可以在不修改一个类的情况下对其进行扩展
- ==OCP 开闭原则
        - 程序应该对修改关闭，对扩展开放==
在子类中，可以通过创建同名方法来重写父类的方法
==重写构造函数时，构造函数的第一行代码必须为super()==
在方法中可以使用super来引用父类的方法
```javascript
class Animal{
            constructor(name){
                this.name = name
            }

            sayHello(){
                console.log("动物在叫~")
            }
        }

        class Dog extends Animal{

            // 在子类中，可以通过创建同名方法来重写父类的方法
            sayHello(){
                console.log("汪汪汪")
            }
            
        }

        class Cat extends Animal{

            // 重写构造函数
            constructor(name, age){
                // c
                super(name) // 调用父类的构造函数

                this.age = age

            }
            
            sayHello(){

                // 调用一下父类的sayHello
                super.sayHello() // 在方法中可以使用super来引用父类的方法

                console.log("喵喵喵")
            }
        }

        
        const dog = new Dog("旺财")
        const cat = new Cat("汤姆", 3)
```
### 9.对象的结构
对象中存储属性的区域实际有两个：
    **1. 对象自身**
        - 直接通过对象所添加的属性，位于对象自身中
        - 在类中通过 x = y 的形式添加的属性，位身中
    **2. 原型对象（prototype）**
        - 对象中还有一些内容，会存储到其他的对象对象）
        ==- 在对象中会有一个属性用来存储原型对象，叫做__proto__==
        - 原型对象也负责为对象存储属性，
            当我们访问对象中的属性时，会优先访问的属性，
           ==对象自身不包含该属性时，才会去原型对象中寻找==
        - 会添加到原型对象中的情况：
            1. 在类中通过xxx(){}方式添加的方法，中
            2. 主动向原型中添加的属性或方法
### 10.原型
访问一个对象的原型对象
对象.__proto__
Object.getPrototypeOf(对象)
原型对象中的数据：
1. 对象中的数据（属性、方法等）
2. constructor （对象的构造函数）
注意：
原型对象也有原型，这样就构成了一条原型链，复杂程度不同，原型链的长度也不同
    ==p对象的原型链：p对象 --> 原型 --> 原型 --> null
    obj对象的原型链：obj对象 --> 原型 --> null==

原型链：
    - 读取对象属性时，会优先对象自身属性，
        ==如果对象中有，则使用，没有则去对象找
        如果原型中有，则使用，没有则去原型找==
        直到找到Object对象的原型（Object原型（为null））
            如果依然没有找到，则返回undefined
- 作用域链，是找变量的链，找不到会报错
- 原型链，是找属性的链，找不到会返回undefined


所有的同类型对象它们的原型对象都是同一个，也就意味着，同类型对象的原型链是一样的

原型的作用：
    原型就相当于是一个公共的区域，可以被所有该问，
        可以将该类实例中，所有的公共属性（方法）到原型中
        **这样我们只需要创建一个属性，即可被所有实例访问**
**JS中继承就是通过原型来实现的,当继承时，子类的原型就是一个父类的实例**

在对象中有些值是对象独有的，像属性（name，age，gen每个对象都应该有自己值，
但是有些值对于每个对象来说都是一样的，像各种于一样的值没必要重复的创建     

### 11.修改原型
大部分情况下，我们是不需要修改原型对象
注意：
    千万不要通过类的实例去修改原型
        1. 通过一个对象影响所有同类对象，适
        2. 修改原型先得创建实例，麻烦
        3. 危险
处理通过__proto__能访问对象的原型外，
还可以通过类的prototype属性，来访问实例的原型
修改原型时，最好通过通过类去修改
好处：
    1. 一修改就是修改所有实例的原型
    2. 无需创建实例即可完成对类的修改

原则：
- 原型尽量不要手动改
- 要改也不要通过实例对象去改
- 通过 类.prototype 属性去修改
- 最好不要直接给prototype去赋值

```javascript
        <script>

            class Person {
                name = "孙悟空"
                age = 18

                sayHello() {
                    console.log("Hello，我是", this.name)
                }
            }
            
            Person.prototype.fly = () => {
                console.log("我在飞！")
            }

            class Dog{

            }

            const p = new Person()
            const p2 = new Person()

            // 通过对象修改原型，向原型中添加方法，修改后所有同类实例都能访问该方法 不要这么做
            // p.__proto__.run = () => {
            //     console.log('我在跑~')
            // }

            // p.__proto__ = new Dog() // 直接为对象赋值了一个新的原型 不要这么做


            // console.log(p)
            // console.log(p2)

            // p.run()
            // p2.run()

            // console.log(Person.prototype) // 访问Person实例的原型对象

            p.fly()
            p2.fly()

        </script>
```

### 12. instanceof和hasOwn
**1.instanceof**
instanceof检查的是对象的原型链上是否有该类实例,只要原型链上有该类实例，就会返回true
- dog -> Animal的实例 -> Object实例 -> Object原型
- Object是所有对象的原型，所以任何和对象和Object进行instanceof运算都会返回true
```javascript
            class Animal {}

            class Dog extends Animal {}

            const dog = new Dog()
```
**2. in**
- 使用in运算符检查属性时，无论属性在对象自身还是在原型中，都会返回true
`console.log(p.hasOwnProperty("sayHello"))`
**3.对象.hasOwnProperty(属性名) (不推荐使用)**
- 用来检查一个对象的自身是否含有某个属性
`console.log(p.hasOwnProperty("sayHello"))`
**4.Object.hasOwn(对象, 属性名)**
- 用来检查一个对象的自身是否含有某个属性
`console.log(p.__proto__.__proto__.hasOwnProperty("hasOwnProperty"))`

### 13.旧类
早期JS中，直接通过函数来定义类
- 一个函数如果直接调用 xxx() 那么这个函数就是一个普通函数
- 一个函数如果通过new调用 new xxx() 那么这个函数就是一个够早函数
```javascript
        <script>
            /* 
                等价于：
                    class Person{

                    }
             
             */

            var Person = (function () {
                function Person(name, age) {
                    // 在构造函数中，this表示新建的对象
                    this.name = name
                    this.age = age

                    // this.sayHello = function(){
                    //     console.log(this.name)
                    // }
                }

                // 向原型中添加属性（方法）
                Person.prototype.sayHello = function () {
                    console.log(this.name)
                }

                // 静态属性
                Person.staticProperty = "xxx"
                // 静态方法
                Person.staticMethod = function () {}

                return Person
            })()

            const p = new Person("孙悟空", 18)

            // console.log(p)


            var Animal = (function(){
                function Animal(){

                }

                return Animal
            })()


            var Cat = (function(){
                function Cat(){

                }

                // 继承Animal
                Cat.prototype = new Animal()

                return Cat
            })()

            var cat = new Cat()

            console.log(cat)
        </script>
```
### 14.new运算符
new运算符是创建对象时要使用的运算符
- 使用new时，到底发生了哪些事情：
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operatnew

- 当使用new去调用一个函数时，这个函数将会作为构造函数调用，
    使用new调用函数时，将会发生这些事：
    1. 创建一个普通的JS对象（Object对象 {}）, 为了方便，称其为新对象
    2. 将构造函数的prototype属性设置为新对象的原型
    3. 使用实参来执行构造函数，并且将新对象设置为函数中的this
    4. 如果构造函数返回的是一个非原始值，则该值会作为new运算的返回值返回（这么做）
- 如果构造函数的返回值是一个原始值或者没有指定返回值，则新的对象将会值返回，通常不会为构造函数指定返回值

### 14.总结
面向对象本质就是，编写代码时所有的操作都是通过对象来进行的。
面向对象的编程的步骤：
    1. 找对象
    2. 搞对象
                    
学习对象：
    3. 明确这个对象代表什么，有什么用    
    4. 如何获取到这个对象
    5. 如何使用这个对象（对象中的属性和方法）

**对象的分类：**
1.内建对象
- 由ES标准所定义的对象
 - 比如 Object Function String Number ....
2.宿主对象
- 由浏览器提供的对象
- BOM、DOM
3.自定义对象
- 由开发人员自己创建的对象
            
## 八.数组
### 1.数组简介

数组（Array）
- 数组也是一种复合数据类型，在数组可以存储多个不同类型的数据
- 数组中存储的是有序的数据，数组中的每个数据都有一个唯一的索引
- 创建数组
- 通过Array()来创建数组，也可以通过[]来创建数组
- 如果读取了一个不存在的元素，不好报错而是返回undefined

- length
    - 获取数组的长度
    - 获取的实际值就是数组的最大索引 + 1
    - 向数组最后添加元素：
            数组[数组.length] = 元素
    - length是可以修改的

```javascript
            const arr = new Array()
            const arr2 = [1, 2, 3, 4, 5] // 数组字面量

            arr[0] = 10
```
### 2.遍历数组
**for-of语句可以用来遍历可迭代对象**
```
                语法：
                    for(变量 of 可迭代的对象){
                        语句...
                    }

                执行流程：
                    for-of的循环体会执行多次，数组中有几个元素就会执行几次，
                        每次执行时都会将一个元素赋值给变量
```

```javascript
 const arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]

            for(let value of arr){
                console.log(value)
            }
```
### 3.数组的方法
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
Array.isArray()
- 用来检查一个对象是否是数组    
at()
- 可以根据索引获取数组中的指定元素
- at可以接收负索引作为参数concat()
- 用来连接两个或多个数组
- 非破坏性方法，不会影响原数组，而是返回一个新的数组
```javascript
 // console.log(Array.isArray({ name: "孙悟空" })) // false
            // console.log(Array.isArray([1, 2, 3])) // true

            const arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]

            // console.log(arr.at(-2))
            // console.log(arr[arr.length - 2])
```
indexOf()
- 获取元素在数组中第一次出现的索引
- 参数：
    1. 要查询的元素
    2. 查询的其实位置lastIndexOf()
- 获取元素在数组中最后一次出现的位置

- 返回值：
    找到了则返回元素的索引，
    没有找到返回-1
join()
- 将一个数组中的元素连接为一个字符串
- ["孙悟空", "猪八戒", "沙和尚", "唐僧", "沙和尚"] -> 猪八戒,沙和尚,唐僧,沙和尚"
- 参数：
    指定一个字符串作为连接符
slice()
- 用来截取数组（非破坏性方法）     
- 参数：
    1. 截取的起始位置（包括该位置）
    2. 截取的结束位置（不包括该位置）   
        - 第二个参数可以省略不写，如果省略则会一直截取到最后
        - 索引可以是负值

    如果将两个参数全都省略，则可以对数组进行浅拷贝（浅复制）

```javascript
 <script>
            let arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧", "沙和尚"]

            let result = arr.indexOf("沙和尚", 3)
            result = arr.lastIndexOf("沙和尚", 3)
            result = arr.indexOf("白骨精")

            result = arr.join()
            result = arr.join("@-@")
            result = arr.join("")

            arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]
            result = arr.slice(0, 2)
            result = arr.slice(1, 3)
            result = arr.slice(1, -1)

            result = arr.slice()

            console.log(result)

        </script>
```


push()
    - 向数组的末尾添加一个或多个元素，并返回新的长度
pop()
    - 删除并返回数组的最后一个元素
unshift()
    - 向数组的开头添加一个或多个元素，并返回新的长度
shift()
    - 删除并返回数组的第一个元素
splice()
    - 可以删除、插入、替换数组中的元素
    - 参数：
        1. 删除的起始位置
        2. 删除的数量
        3. 要插入的元素

    - 返回值：
        - 返回被删除的元素
reverse()
    - 反转数组

```javascript
let result = arr.push("唐僧", "白骨精")

            // console.log(arr)

            result = arr.pop()
            arr.unshift("牛魔王")
            arr.shift()

            // console.log(arr)

            arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]
            // result = arr.splice(1, 3)
            // result = arr.splice(1, 1, "牛魔王", "铁扇公主", "红孩儿")
            result = arr.splice(1, 0, "牛魔王", "铁扇公主", "红孩儿")

            // console.log(result)
            // console.log(arr)

            arr = ["a", "b", "c", "d"]
            arr.reverse()
```

**sort()**
- sort用来对数组进行排序（会对改变原数组）
- sort默认会将数组升序排列
注意：sort默认会按照Unicode编码进行排序，所以如果直接通过sort对数字进行排序，可能会得到一个不正确的结果
- 参数：
- 可以传递一个回调函数作为参数，通过回调函数来指定排序规则
(a, b) => a - b 升序排列
(a, b) => b - a 降序排列

**forEach()**
- 用来遍历数组
- 它需要一个回调函数作为参数，这个回调函数会被调用多次
- 数组中有几个元素，回调函数就会调用几次
- 回调函数中有三个参数：
element 当前的元素
index 当前元素的索引
array 被遍历的数组

filter()
- 将数组中符合条件的元素保存到一个新数组中返回
- 需要一个回调函数作为参数，会为每一个元素去调用回调函数，并根返回值来决定是否将元素添加到新数组中
- 非破坏性方法，不会影响原数组

map()
- 根据当前数组生成一个新数组
- 需要一个回调函数作为参数，
回调函数的返回值会成为新数组中的元素
- 非破坏性方法不会影响原数组

reduce()
- 可以用来将一个数组中的所有元素整合为一个值
- 参数：
1. 回调函数，通过回调函数来指定合并的规则
2. 可选参数，初始值

```javascript
arr.sort((a, b) => a - b)
            arr.sort((a, b) => b - a)

            // console.log(arr)

            arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]

            // arr.forEach((element, index, array) => {
            //     console.log(array)
            // })

            // arr.forEach((element, index) => console.log(index, element))

            arr = [1, 2, 3, 4, 5, 6, 7, 8]

            // 获取数组中的所有偶数
            let result = arr.filter((ele) => ele > 5)

            result = arr.map((ele) => ele * 2)

            arr = ["孙悟空", "猪八戒", "沙和尚"]

            result = arr.map((ele) => "<li>" + ele + "</li>")

            arr = [1, 2, 3, 4, 5, 6, 7, 8]

            result = arr.reduce((a, b) => {
                /* 
                    1, 2
                    3, 3
                    6, 4
                    10, 5
                
                */
                // console.log(a, b)

                return a * b
            })
```
### 4.浅拷贝和深拷贝
**浅拷贝（shallow copy）**
    - 通常对对象的拷贝都是浅拷贝
    ==- 浅拷贝顾名思义，只对对象的浅层进行复制（只复制一层）
    - 如果对象中存储的数据是原始值，那么拷贝的深浅是不重要
    - 浅拷贝只会对对象本身进行复制，不会复制对象中的属性（或元素）==

**深拷贝（deep copy）**
    - 深拷贝指不仅复制对象本身，还复制对象中的属性和元素
    - 因为性能问题，通常情况不太使用深拷贝
```javascript
// 创建一个数组
        const arr = [{name:"孙悟空"}, {name:"猪八戒"}]
        const arr2 = arr.slice() // 浅拷贝

        const arr3 = structuredClone(arr) // 专门用来深拷贝的方法
```
### 5.对象的复制
... (展开运算符)
- 可以将一个数组中的元素展开到另一个数组中或者作为函数的参数传递
- 通过它也可以对数组进行浅复制
```javascript
 // const arr3 = [arr[0], arr[1], arr[2]]
            const arr3 = [...arr]
            
            function sum(a, b, c) {
                return a + b + c
            }

            const arr4 = [10, 20, 30]

            let result = sum(arr4[0], arr4[1], arr4[2])
            result = sum(...arr4)
```
对象的复制
- Object.assign(目标对象, 被复制的对象)
- 将被复制对象中的属性复制到目标对象里，并将目标对象返回
- 也可以使用展开运算符对对象进行复制
```javascript
const obj = { name: "孙悟空", age: 18 }

            // const obj2 = Object.assign({}, obj)
            const obj2 = { address: "花果山", age: 28 }

            Object.assign(obj2, obj)
            // console.log(obj2)

            const obj3 = { address: "高老庄", ...obj, age: 48 } // 将obj中的属性在新对象中展开
```
### 6.数组去重
```javascript
        <script>
            const arr = [1, 2, 1, 3, 2, 2, 4, 5, 5, 6, 7]

            // 编写代码去除数组中重复的元素

            // 分别获取数组中的元素
            for (let i = 0; i < arr.length; i++) {
                // 获取当前值后边的所有值
                for (let j = i + 1; j < arr.length; j++) {
                    // 判断两个数是否相等
                    if (arr[i] === arr[j]) {
                        // 出现了重复元素，删除后边的元素
                        arr.splice(j, 1)

                        /* 
                            当arr[i] 和 arr[j]相同时，它会自动的删除j位置的元素，然后j+1位置的元素，会变成j位置的元素
                            而j位置已经比较过了，不会重复比较，所以会出现漏比较的情况

                            解决办法，当删除一个元素后，需要将该位置的元素在比较一遍
                        */
                        j--
                    }
                }
            }

            console.log(arr)
        </script>
```
### 7.高阶函数
```javascript
<script>
            /*
                希望在someFn()函数执行时，可以记录一条日志

                在不修改原函数的基础上，为其增加记录日志的功能

                可以通过高阶函数，来动态的生成一个新函数
            */

            function someFn() {
                return "hello"
            }

            function outer(cb){
                return () => {
                    console.log("记录日志~~~~~")
                    const result = cb()
                    return result
                }
            }

            let result = outer(someFn)

            // console.log(result)


            function test(){
                console.log("test~~~~")
                return "test"
            }

            let newTest = outer(test)

            newTest()
        </script>
```
### 8.闭包
>              创建一个函数，第一次调用时打印1，第二次调用打印2，以此类推
>
>                可以利用函数，来隐藏不希望被外部访问到的变量
>
**闭包：**
    闭包就是能访问到外部函数作用域中变量的函数
什么时候使用：
    当我们需要隐藏一些不希望被别人访问的内容时就可以使用闭包
构成闭包的要件：
    1. 函数的嵌套
    2. 内部函数要引用外部函数中的变量
    3. 内部函数要作为返回值返回

```javascript
         function outer(){
                let num = 0 // 位于函数作用域中

                return () => {
                    num++
                    console.log(num)
                }
            }

            const newFn = outer()

            // console.log(newFn)
            newFn()
            newFn()
            newFn()
```
**闭包的生命周期：**
1. 闭包在外部函数调用时产生，外部函数每次调用都会产生一个全新的闭包
2. 在内部函数丢失时销毁（内部函数被垃圾回收了，闭包才会消失）
注意事项：
闭包主要用来隐藏一些不希望被外部访问的内容，这就意味着闭包需要占用一定的内存空间

相较于类来说，闭包比较浪费内存空间（类可以使用原型而闭包不能），
- 需要执行次数较少时，使用闭包
- 需要大量创建实例时，使用类

### 9.可变参数

**arguments**
- arguments是函数中又一个隐含参数
- arguments是一个类数组对象（伪数组）
和数组相似，可以通过索引来读取元素，也可以通过for循环变量，但是它不是一个数组对象，不能调用数组的方法
- arguments用来存储函数的实参，无论用户是否定义形参，实参都会存储到arguments对象中，可以通过该对象直接访问实参

**可变参数**，在定义函数时可以将参数指定为可变参数
- 可变参数可以接收任意数量实参，并将他们统一存储到一个数组中返回
- 可变参数的作用和arguments基本是一致，但是也具有一些不同点：
1. 可变参数的名字可以自己指定
2. 可变参数就是一个数组，可以直接使用数组的方法
3. 可变参数可以配合其他参数一起使用

==当可变参数和普通参数一起使用时，需要将可变参数写到最后==
```javascript
        <script>
            function fn() {
                /* 
                    arguments
                        - arguments是函数中又一个隐含参数
                        - arguments是一个类数组对象（伪数组）
                            和数组相似，可以通过索引来读取元素，也可以通过for循环变量，但是它不是一个数组对象，不能调用数组的方法
                        - arguments用来存储函数的实参，
                            无论用户是否定义形参，实参都会存储到arguments对象中
                            可以通过该对象直接访问实参
                */

                // console.log(arguments[2])
                // console.log(Array.isArray(arguments))
                // for (let i = 0; i < arguments.length; i++) {
                //     console.log(arguments[i])
                // }

                // for(let v of arguments){
                //     console.log(v)
                // }

                arguments.forEach((ele) => console.log(ele))
            }

            // fn(1, 10, 33)

            // 定义一个函数，可以求任意个数值的和
            function sum() {
                // 通过arguments，可以不受参数数量的限制更加灵活的创建函数
                let result = 0

                for (let num of arguments) {
                    result += num
                }

                return result
            }

            /* 
                可变参数，在定义函数时可以将参数指定为可变参数
                    - 可变参数可以接收任意数量实参，并将他们统一存储到一个数组中返回
                    - 可变参数的作用和arguments基本是一致，但是也具有一些不同点：
                        1. 可变参数的名字可以自己指定
                        2. 可变参数就是一个数组，可以直接使用数组的方法
                        3. 可变参数可以配合其他参数一起使用
            */

            function fn2(...abc) {
                console.log(abc)
            }

            function sum2(...num) {
                return num.reduce((a, b) => a + b, 0)
            }

            // 当可变参数和普通参数一起使用时，需要将可变参数写到最后
            function fn3(a, b, ...args) {
                // for (let v of arguments) {
                //     console.log(v)
                // }

                console.log(args)
            }

            fn3(123, 456, "hello", true, "1111")
        </script>
```

### 10.this相关
根据函数调用方式的不同，this的值也不同：
1. 以函数形式调用，this是window
2. 以方法形式调用，this是调用方法的对象
3. 构造函数中，this是新建的对象
4. 箭头函数没有自己的this，由外层作用域决定
5. 通过call和apply调用的函数，它们的第一个参数就是函数的this
            
调用函数除了通过 函数() 这种形式外，还可以通过其他的方式来调用函数
                    比如，我们可以通过调用函数的call()和apply()来个方法来调用函数
                        函数.call()
                        函数.apply()
                        - call 和 apply除了可以调用函数，还可以用来指定函数中的this
                        - call和apply的第一个参数，将会成为函数的this
                        - 通过call方法调用函数，函数的实参直接在第一个参数后一个一个的列出来
                        - 通过apply方法调用函数，函数的实参需要通过一个数组传递
```javascript
        <script>
            /* 
                根据函数调用方式的不同，this的值也不同：
                    1. 以函数形式调用，this是window
                    2. 以方法形式调用，this是调用方法的对象
                    3. 构造函数中，this是新建的对象
                    4. 箭头函数没有自己的this，由外层作用域决定
                    5. 通过call和apply调用的函数，它们的第一个参数就是函数的this
            
            */
            function fn() {
                console.log("函数执行了~", this)
            }

            const obj = { name: "孙悟空", fn }

            /* 
                调用函数除了通过 函数() 这种形式外，还可以通过其他的方式来调用函数
                    比如，我们可以通过调用函数的call()和apply()来个方法来调用函数
                        函数.call()
                        函数.apply()
                        - call 和 apply除了可以调用函数，还可以用来指定函数中的this
                        - call和apply的第一个参数，将会成为函数的this
                        - 通过call方法调用函数，函数的实参直接在第一个参数后一个一个的列出来
                        - 通过apply方法调用函数，函数的实参需要通过一个数组传递
            */

            // fn.call(obj)
            // fn.apply(console)

            function fn2(a, b) {
                console.log("a =", a, "b =", b, this)
            }

            // fn2.call(obj, "hello", true)
            fn2.apply(obj, ["hello", true])
        </script>
```

```javascript
 <script>
            /* 
            
                根据函数调用方式的不同，this的值也不同：
                    1. 以函数形式调用，this是window
                    2. 以方法形式调用，this是调用方法的对象
                    3. 构造函数中，this是新建的对象
                    4. 箭头函数没有自己的this，由外层作用域决定
                    5. 通过call和apply调用的函数，它们的第一个参数就是函数的this
                    6. 通过bind返回的函数，this由bind第一个参数决定（无法修改）

                bind() 是函数的方法，可以用来创建一个新的函数
                    - bind可以为新函数绑定this
                    - bind可以为新函数绑定参数

                箭头函数没有自身的this，它的this由外层作用域决定，
                    也无法通过call apply 和 bind修改它的this 
                    箭头函数中没有arguments
            */

            function fn(a, b, c) {
                console.log("fn执行了~~~~", this)
                console.log(a, b, c)
            }

            const obj = {name:"孙悟空"}

            const newFn = fn.bind(obj, 10, 20, 30)

            // newFn()


            const arrowFn = () => {
                console.log(this)
            }

            // arrowFn.call(obj)

            const newArrowFn = arrowFn.bind(obj)

            // newArrowFn()

            class MyClass{
                fn = () => {
                    console.log(this)
                }
            }

            const mc = new MyClass()

            // mc.fn.call(window)
        </script>
```
## 九.内建对象

### 1.解构赋值
```
let a,
                b,
                c

                // a = arr[0]
                // b = arr[1]
                // c = arr[2]
            ;[a, b, c] = arr // 解构赋值
```
`let [d, e, f, g] = ["唐僧", "白骨精", "蜘蛛精", "玉兔精"] // 声明同时解构`
```
            // ;[d, e, f, g] = [1, 2, 3]
            // ;[d, e, f = 77, g = 10] = [1, 2, 3]
            ;[d, e, f = 77, g = g] = [1, 2, 3]
```
`let [n1, n2, ...n3] = [4, 5, 6, 7] // 解构数组时，可以使用...来设置获取多余的元素`
==可以通过解构赋值来快速交换两个变量的值==
```javascript
            let a1 = 10
            let a2 = 20

            // let temp = a1
            // a1 = a2
            // a2 = temp

            ;[a1, a2] = [a2, a1] // [20, 10]

            const arr2 = ["孙悟空", "猪八戒"]
            // console.log(arr2)

            ;[arr2[0], arr2[1]] = [arr2[1], arr2[0]]
```
### 2.对象的序列化

对象的序列化
  - JS中的对象使用时都是存在于计算机的内存中的
     - 序列化指将对象转换为一个可以存储的格式
        在JS中对象的序列化通常是将一个对象转换为字符串（JSON字符串）
    - 序列化的用途（对象转换为字符串有什么用）：
        - 对象转换为字符串后，可以将字符串在不同的语言之间进行传递
                            甚至人可以直接对字符串进行读写操作，使得JS对象可以不同的语言之间传递
        - 用途：
            1. 作为数据交换的格式
            2. 用来编写配置文字
    - 如何进行序列化：
        - 在JS中有一个工具类 JSON （JavaScript Object Notation） 
        - JS对象序列化后会转换为一个字符串，这个字符串我们称其为JSON字符串  
                        
    - 也可以手动的编写JSON字符串，在很多程序的配置文件就是使用JSON编写的
    - 编写JSON的注意事项：
        1. JSON字符串有两种类型：
            - JSON对象 {}
            - JSON数组 []
        2. JSON字符串的属性名必须使用双引号引起来
        3. JSON中可以使用的属性值（元素）
            - 数字（Number）
            - 字符串（String） 必须使用双引号
            - 布尔值（Boolean）
            - 空值（Null）
            - 对象（Object {}）
            - 数组（Array []）
        4. JSON的格式和JS对象的格式基本上一致的，
           注意：JSON字符串如果属性是最后一个，则不要再加,
```javascript
    const str = JSON.stringify(obj) //JSON.stringify() 可以将一个对象转换为JSON字符串

    const obj2 = JSON.parse(str) // JSON.parse() 可以将一个JSON格式的字符串转换为JS对象
```

### 3.复制
```javascript
            // 对obj进行浅复制
            const obj2 = Object.assign({}, obj)

            // 对obj进行深复制
            const obj3 = structuredClone(obj)

            // 利用JSON来完成深复制
            const str = JSON.stringify(obj)
            const obj4 = JSON.parse(str)
```

### 4.Map
- Map用来存储键值对结构的数据（key-value）
- Object中存储的数据就可以认为是一种键值对结构
- Map和Object的主要区别：
    - Object中的属性名只能是字符串或符号，如果传递了一个其他类型的属性名，JS解释器会自动将其转换为字符串
    - Map中任何类型的值都可以称为数据的key
```javascript
创建：
    new Map()

属性和方法：
    map.size() 获取map中键值对的数量
    map.set(key, value) 向map中添加键值对
    map.get(key) 根据key获取值   
    map.delete(key) 删除指定数据
    map.has(key) 检查map中是否包含指定键
    map.clear() 删除全部的键值对
    将map转换为数组
    const arr = Array.from(map) // [["name","孙悟空"],["age",18]]
    const arr = [...map]

    map.keys() - 获取map的所有的key
    map.values() - 获取map的所有的value

```

### 5.Set
Set
- Set用来创建一个集合
- 它的功能和数组类似，不同点在于Set中不能存储重复的数据

```javascript

- 使用方式：
    创建
        - new Set()
             new Set([...])

    方法
        size 获取数量
        add() 添加元素
        has() 检查元素
        delete() 删除元素
```

### 6.包装类
在JS中，除了直接创建原始值外，也可以创建原始值的对象
- 通过 new String() 可以创建String类型的对象
- 通过 new Number() 可以创建Number类型的对象
- 通过 new Boolean() 可以创建Boolean类型的对象
==但是千万不要这么做==
包装类：
JS中一共有5个包装类
    String --> 字符串包装为String对象
    Number --> 数值包装为Number对象
    Boolean --> 布尔值包装为Boolean对象
    BigInt --> 大整数包装为BigInt对象
    Symbol --> 符号包装为Symbol对象
    - 通过包装类可以将一个原始值包装为一个对象，
        ==当我们对一个原始值调用方法或属性时，JS解释器会临时将原始值包装为对应的对象，然后调用这个对象的属性或方法==

- 由于原始值会被临时转换为对应的对象，这就意味着对象中的方法都可以直接通过原始值来调用

### 6.字符串
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
字符串：
- 字符串其本质就是一个字符数组
- "hello" --> ["h", "e", "l", "l", "o"]
- 字符串的很多方法都和数组是非常类似的
- 属性和方法：
```javascript
                        length 获取字符串的长度
                        字符串[索引] 获取指定位置的字符
                        str.at() （实验方法）
                            - 根据索引获取字符，可以接受负索引
                        str.charAt()
                            - 根据索引获取字符
                        str.concat()
                            - 用来连接两个或多个字符串
                        str.includes()
                            - 用来检查字符串中是否包含某个内容
                                有返回true
                                没有返回false
                        str.indexOf()
                        str.lastIndexOf()
                            - 查询字符串中是否包含某个内容
                        str.startsWith()
                            - 检查一个字符串是否以指定内容开头
                        str.endsWith()
                            - 检查一个字符串是否以指定内容结尾
                        str.padStart()
                        str.padEnd()
                            - 通过添加指定的内容，使字符串保持某个长度
                        str.replace()
                            - 使用一个新字符串替换一个指定内容
                        str.replaceAll()    
                            - 使用一个新字符串替换所有指定内容
                        str.slice()
                            - 对字符串进行切片
                        str.substring()
                            - 截取字符串
                        str.split()
                            - 用来将一个字符串拆分为一个数组
                        str.toLowerCase()
                            - 将字符串转换为小写
                        str.toUpperCase()
                            - 将字符串转换为大写
                        str.trim()
                            - 去除前后空格
                        str.trimStart()
                            - 去除开始空格
                        str.trimEnd()
                            - 去除结束空格
```

### 7.正则表达式
正则表达式
- 正则表达式用来定义一个规则
- 通过这个规则计算机可以检查一个字符串是否符合规则，或者将字符串中符合规则的内容提取出来
- 正则表达式也是JS中的一个对象，，所以要使用正则表达式，需要先创建正则表达式的对象
```javascript
// new RegExp() 可以接收两个参数（字符串） 1.正则表达式 2.匹配模式
            let reg = new RegExp("a", "i") // 通过构造函数来创建一个正则表达式的对象

            // 使用字面量来创建正则表达式：/正则/匹配模式
            reg = /a/i
            // 通过正则表达式检查一个字符串是否符合规则
            let result = reg.test(str) 
```


1.在正则表达式中大部分字符都可以直接写
2.| 在正则表达式中表示或
3.[] 表示或（字符集）
    [a-z] 任意的小写字母
    [A-Z] 任意的大写字母
    [a-zA-Z] 任意的字母
    [0-9]任意数字
4.[^] 表示除了
    ==[^x] 除了x==
1. . 表示除了换行外的任意字符
2. 在正则表达式中使用\作为转义字符
3. 其他的字符集
    ==\w 任意的单词字符 [A-Za-z0-9_]==
    \W 除了单词字符 [^A-Za-z0-9_]
    ==\d 任意数字 [0-9]==
    \D 除了数字 [^0-9]
    \s 空格
    \S 除了空格
    \b 单词边界
    \B 除了单词边界
4. 开头和结尾
    ==^ 表示字符串的开头
    $ 表示字符串的结尾==


**量词**
    {m} 正好m个
    {m,} 至少m个
    {m,n} m-n个
    + 一个以上，相当于{1,}
    * 任意数量的a
    ? 0-1次 {0,1}

  **re.exec()**
   - 获取字符串中符合正则表达式的内容
```javascript
        <script>

           // 提取出str中符合axc格式的内容
        
           // g表示全局匹配
           let re = /a(([a-z])c)/ig

           let result = re.exec(str)

        //    console.log(result)


            while(result){
                console.log(result[0], result[1], result[2])
                result = re.exec(str)
            }

            /* 
                dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadadasd
            
            */

        </script>
```

```javascript
    split()
        - 可以根据正则表达式来对一个字符串进行拆分
    search()
        - 可以去搜索符合正则表达式的内容第一次在字符串中出现的位置
    replace()
        - 根据正则表达式替换字符串中的指定内容
    match()
        - 根据正则表达式去匹配字符串中符合要求的内容
    matchAll()
        - 根据正则表达式去匹配字符串中符合要求的内容(必须设置g 全局匹配)
        - 它返回的是一个迭代器
```

```javascript

            let str = "a@b@c@d"

            let result = str.split("@")

            str = "孙悟空abc猪八戒adc沙和尚"
            result = str.split(/a[bd]c/)

            str =
                "dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadadasd"

            result = str.search("abc")
            result = str.search(/1[3-9]\d{9}/)

            result = str.replace(/1[3-9]\d{9}/g, "哈哈哈")

            result = str.match(/1[3-9]\d{9}/g)

            result = str.matchAll(/1[3-9](\d{9})/g)

            for(let item of result){
                console.log(item)
            }
```
### 8.垃圾回收
垃圾回收（Garbage collection）
- 和生活一样，生活时间长了以后会产生生活垃圾，程序运行一段时间后也会产生垃圾
- 在程序的世界中，什么是垃圾？
    - 如果一个对象没有任何的变量对其进行引用，那么这个对象就是一个垃圾
    - 垃圾对象的存在，会严重的影响程序的性能
    - 在JS中有自动的垃圾回收机制，这些垃圾对象会被解释器自动回收，我们无需手动处理
    - 对于垃圾回收来说，我们唯一能做的事情就是将不再使用的变量设置为null

## 十.DOM
### 1.document
document对象
- document对象表示的是整个网页
- document对象的原型链
    ==HTMLDocument -> Document -> Node -> EventTarget -> Object.prototype -> null==
- 凡是在原型链上存在的对象的属性和方法都可以通过Document去调用
- 部分属性：
    document.documentElement --> html根元素
    document.head --> head元素
    document.title --> title元素
    document.body --> body元素
    document.links --> 获取页面中所有的超链接
                   
### 2.元素节点
元素节点对象（element）
- 在网页中，每一个标签都是一个元素节点
- 如何获取元素节点对象？
    1. 通过document对象来获取元素节点
    2. 通过document对象来创建元素节点
- 通过document来获取已有的元素节点：
    **document.getElementById()**
        - 根据id获取一个元素节点对象
    **document.getElementsByClassName()**
        - 根据元素的class属性值获取一组元素节点对象
        ==- 返回的是一个类数组对象==
        - 该方法返回的结果是一个实时更新的集合
                                当网页中新添加元素时，集合也会实时的刷新
    **document.getElementsByTagName()**
        - 根据标签名获取一组元素节点对象
        - 返回的结果是可以实时更新的集合
        - document.getElementsByTagName("*") 获取页面中所有的元素
    **document.getElementsByName()**
        - 根据name属性获取一组元素节点对象
        - 返回一个实时更新的集合
        - 主要用于表单项
    **document.querySelectorAll()**
        - 根据选择器去页面中查询元素
        - 会返回一个类数组（不会实时更新）
    **document.querySelector()**
        - 根据选择器去页面中查询==第一个==符合条件的元素

- 创建一个元素节点
    **document.createElement()**
        - 根据标签名创建一个元素节点对象

```javascript
            const btn = document.getElementById("btn")

            const spans = document.getElementsByClassName("s1")

            const divs = document.getElementsByTagName("div")

            const genderInput = document.getElementsByName("gender")

            const divs2 = document.querySelectorAll("div")

            const div = document.querySelector("div")

            const h2 = document.createElement("h2")
```

### 3.元素节点
通过元素节点对象获取其他节点的方法
- element.childNodes 获取当前元素的子节点（会包含空白的子节点）
- element.children 获取当前元素的子元素
- element.firstElementChild 获取当前元素的第一个子元素
- element.lastElementChild 获取当前元素的最后一个子元素
- element.nextElementSibling 获取当前元素的下一个兄弟元素
- element.previousElementSibling 获取当前元素的前一个兄弟元素
- element.parentNode 获取当前元素的父节点
- element.tagName 获取当前元素的标签名

### 4.文本节点
在DOM中，网页中所有的文本内容都是文本节点对象,
可以通过元素来获取其中的文本节点对象，但是我们通常不会这么做

我们可以直接通过元素去修改其中的文本
**element.textContent 获取或修改元素中的文本内容**
 - 获取的是标签中的内容，不会考虑css样式

**element.innerText 获取或修改元素中的文本内容**
  - innerText获取内容时，会考虑css样式
  - 通过innerText去读取CSS样式，会触发网页的重排（计算CSS样式）
  - 当字符串中有标签时，会自动对标签进行转义
  -` <li> --> &lt;li&gt;`

**element.innerHTML 获取或修改元素中的html代码**
  - 可以直接向元素中添加html代码
  ==- innerHTML插入内容时，有被xss注入的风险==

### 5.属性节点
属性节点（Attr）
- 在DOM也是一个对象，通常不需要获取对象而是直接通过元素即可完成对其的各种操作
- 如何操作属性节点：

方式一：
- 读取：元素.属性名（注意，class属性需要使用className来读取），读取一个布尔值时，会返回true或false
- 修改：元素.属性名 = 属性值

方式二：
- 读取：元素.getAttribute(属性名)
- 修改：元素.setAttribute(属性名, 属性值)
- 删除：元素.removeAttribute(属性名)
```javascript
 <body>
        <input class="a" type="text" name="username" value="admin">

        <script>
            // const input = document.getElementsByName("username")[0]

            const input = document.querySelector("[name=username]")

            // console.log(input.type)

            // console.log(input.getAttribute("type"))

            // input.setAttribute("value", "孙悟空")

            input.setAttribute("disabled", "disabled")

        </script>
    </body>
```

### 6.事件

事件（event）
- 事件就是用户和页面之间发生的交互行为
    比如：点击按钮、鼠标移动、双击按钮、敲击键盘、松开按键...  
- 可以通过为事件绑定响应函数（回调函数），来完成和用户之间的交互
- 绑定响应函数的方式：
    1.可以直接在元素的属性中设置
    2.可以通过为元素的指定属性设置回调函数的形式来绑定事件（一个事件只能绑定一个响应函数）
    3.可以通过元素addEventListener()方法来绑定事件

**在下面代码中btn.onclick=function()只可绑定一次，而btn.addEventListener可以绑定多个**

```javascript
<body>
        <!-- <button id="btn" onmouseenter="alert('你点我干嘛~')">点我一下</button> -->
        <button id="btn">点我一下</button>
        <script>
            // 获取到按钮对象
            const btn = document.getElementById("btn")
            // 为按钮对象的事件属性设置响应函数
            // btn.onclick = function(){
            //     alert("我又被点了一下~~")
            // }

            // btn.onclick = function(){
            //     alert("1123111")
            // }

            btn.addEventListener("click", function(){
                alert("哈哈哈")
            })

            btn.addEventListener("click", function(){
                alert("嘻嘻嘻")
            })

            btn.addEventListener("click", function(){
                alert("呜呜呜")
            })
        </script>
    </body>
```
### 7.文档加载
网页是自上向下加载的，如果将js代码编写到网页的上边，
js代码在执行时，网页还没有加载完毕，这时会出现无法获取到DOM对象的情况

==window.onload 事件会在窗口中的内容加载完毕之后才触发
document的DOMContentLoaded事件会在当前文档加载完毕之后触发==

如何解决这个问题：
    1. 将script标签编写到body的最后（*****）
    2. 将代码编写到window.onload的回调函数中
    3. 将代码编写到document对象的DOMContentLoaded的回调函数中（执行时机更早）
    4. 将代码编写到外部的js文件中，然后以defer的形式进行引入（执行时机更早，早于DOMContentLoaded）（*****）
            
```javascript

window.onload = function () {
 const btn = document.getElementById("btn")
    console.log(btn)
}

window.addEventListener("load", function () {
    const btn = document.getElementById("btn")
    alert(btn)
})

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn")
    alert(btn)
})
<script defer src="./script/script.js"></script>
```

### 8.DOM的修改
**appendChild() 用于给一个节点添加子节点**

**insertAdjacentElement()可以向元素的任意位置添加元素**
两个参数：1.要添加的位置 2.要添加的元素
    beforeend 标签的最后 afterbegin 标签的开始  
    beforebegin 在元素的前边插入元素（兄弟元素） afterend 在元素的后边插入元素（兄弟元素）

**replaceWith() 使用一个元素替换当前元素**

**remove()方法用来删除当前元素**

```javascript
<body>
        <button id="btn01">按钮1</button>
        <button id="btn02">按钮2</button>

        <hr />

        <ul id="list">
            <li id="swk">孙悟空</li>
            <li id="zbj">猪八戒</li>
            <li id="shs">沙和尚</li>
        </ul>

        <script>
            /* 
                点击按钮后，向ul中添加一个唐僧
            */

            // 获取ul
            const list = document.getElementById("list")

            // 获取按钮
            const btn01 = document.getElementById("btn01")
            btn01.onclick = function () {
                // <li id="shs">沙和尚</li>

                // 创建一个li
                const li = document.createElement("li")
                // 向li中添加文本
                li.textContent = "唐僧"
                // 给li添加id属性
                li.id = "ts"

                // appendChild() 用于给一个节点添加子节点
                // list.appendChild(li)

                //insertAdjacentElement()可以向元素的任意位置添加元素
                //两个参数：1.要添加的位置 2.要添加的元素
                // beforeend 标签的最后 afterbegin 标签的开始  
                // beforebegin 在元素的前边插入元素（兄弟元素） afterend 在元素的后边插入元素（兄弟元素）
                // list.insertAdjacentElement("afterend", li)

                list.insertAdjacentHTML("beforeend", "<li id='bgj'>白骨精</li>")

            }


            const btn02 = document.getElementById("btn02")
            btn02.onclick = function(){
                // 创建一个蜘蛛精替换孙悟空
                const li = document.createElement("li")
                li.textContent = "蜘蛛精"
                li.id = "zzj"

                // 获取swk
                const swk = document.getElementById("swk")

                // replaceWith() 使用一个元素替换当前元素
                // swk.replaceWith(li)

                // remove()方法用来删除当前元素
                swk.remove()

            }
        </script>
    </body>
```
### 9.节点的复制
**cloneNode()**
- 使用 cloneNode() 方法对节点进行复制时，它会复制节点的所有特点包括各种属性
- 这个方法默认只会复制当前节点，而不会复制节点的子节点
- 可以传递一个true作为参数，这样该方法也会将元素的子节点一起复制
                
```javascript
    <body>
        <button id="btn01">点我一下</button>

        <ul id="list1">
            <li id="l1">孙悟空</li>
            <li id="l2">猪八戒</li>
            <li id="l3">沙和尚</li>
        </ul>

        <ul id="list2">
            <li>蜘蛛精</li>
        </ul>

        <script>
            /* 点击按钮后，将id为l1的元素添加list2中 */
            const list2 = document.getElementById("list2")
            const l1 = document.getElementById("l1")
            const btn01 = document.getElementById("btn01")
            btn01.onclick = function () {
                const newL1 = l1.cloneNode(true) // 用来对节点进行复制的
                newL1.id = "newL1"
                list2.appendChild(newL1)
            }
        </script>
    </body>
```

### 10.修改CSS样式
- 修改样式的方式：元素.style.样式名 = 样式值
- ==如果样式名中含有-，则需要将样式表修改为驼峰命名法,background-color --> backgroundColor==
```javascript
<style>
            .box1 {
                width: 200px;
                height: 200px;
                background-color: #bfa;
            }
        </style>
    </head>
    <body>
        <button id="btn">点我一下</button>

        <hr />

        <div class="box1"></div>

        <script>
            /* 
                点击按钮后，修改box1的宽度
            */

            const btn = document.getElementById("btn")
            const box1 = document.querySelector(".box1")

            btn.onclick = function () {
                // 修改box1的样式
                // 修改样式的方式：元素.style.样式名 = 样式值
                // 如果样式名中含有-，则需要将样式表修改为驼峰命名法
                // background-color --> backgroundColor
                box1.style.width = "400px"
                box1.style.height = "400px"
                box1.style.backgroundColor = "yellow"
            }
        </script>
    </body>
```

==除了直接修改样式外，也可以通过修改class属性来间接的修改样式==
通过class修改样式的好处：
1. 可以一次性修改多个样式
2. 对JS和CSS进行解耦
box1.className += " box2"


元素.classList 是一个对象，对象中提供了对当前元素的类的各种操作方法
- 元素.classList.add() 向元素中添加一个或多个class
- 元素.classList.remove() 移除元素中的一个或多个class
- 元素.classList.toggle() 切换元素中的class
- 元素.classList.replace() 替换class
- 元素.classList.contains() 检查class

```javascript
<style>
            .box1 {
                width: 200px;
                height: 200px;
                background-color: #bfa;
            }


            .box2{
                background-color: yellow;
                width: 300px;
                height: 500px;
                border: 10px greenyellow solid;
            }
        </style>
    </head>
    <body>
        <button id="btn">点我一下</button>

        <hr />

        <div class="box1 box3 box4"></div>

        <script>
            /* 
                点击按钮后，修改box1的宽度
            */

            const btn = document.getElementById("btn")
            const box1 = document.querySelector(".box1")

            btn.onclick = function () {

                // 除了直接修改样式外，也可以通过修改class属性来间接的修改样式
                /* 
                    通过class修改样式的好处：
                        1. 可以一次性修改多个样式
                        2. 对JS和CSS进行解耦
                */
                // box1.className += " box2"

                // 元素.classList 是一个对象，对象中提供了对当前元素的类的各种操作方法
                /* 
                    元素.classList.add() 向元素中添加一个或多个class
                    元素.classList.remove() 移除元素中的一个或多个class
                    元素.classList.toggle() 切换元素中的class
                    元素.classList.replace() 替换class
                    元素.classList.contains() 检查class
                */
                // box1.classList.add("box2", "box3", "box4")
                // box1.classList.add("box1")

                // box1.classList.remove("box2")
                // box1.classList.toggle("box2")
                // box1.classList.replace("box1", "box2")

                let result = box1.classList.contains("box3")

                console.log(result)
                
            }
        </script>
    </body>
```
### 11.读取CSS样式
getComputedStyle()
- 它会返回一个对象，这个对象中包含了当前元素所有的生效的样式
- 参数：
    1. 要获取样式的对象
    2. 要获取的伪元素
- 返回值：
    返回的一个对象，对象中存储了当前元素的样式

- 注意：
    样式对象中返回的样式值，不一定能来拿来直接计算吗，所以使用时，一定要确保值是可以计算的才去计算
```javascript
<style>
            .box1 {
                height: 200px;
                background-color: #bfa;
            }

            .box1::before {
                content: "hello";
                color: red;
            }
        </style>
    </head>
    <body>
        <button id="btn">点我一下</button>

        <hr />

        <div class="box1"></div>

        <script>
            /* 
                点击按钮后，读取元素的css样式
            */

            const btn = document.getElementById("btn")
            const box1 = document.querySelector(".box1")

            btn.onclick = function () {
                /* 
                    getComputedStyle()
                        - 它会返回一个对象，这个对象中包含了当前元素所有的生效的样式
                        - 参数：
                            1. 要获取样式的对象
                            2. 要获取的伪元素
                        - 返回值：
                            返回的一个对象，对象中存储了当前元素的样式

                        - 注意：
                            样式对象中返回的样式值，不一定能来拿来直接计算
                                所以使用时，一定要确保值是可以计算的才去计算
                */
                const styleObj = getComputedStyle(box1)

                console.log(styleObj.width)
                console.log(styleObj.left)

                // console.log(parseInt(styleObj.width) + 100)
                // box1.style.width = parseInt(styleObj.width) + 100 + "px"

                // console.log(styleObj.backgroundColor)

                const beforeStyle = getComputedStyle(box1, "::before")
                // console.log(beforeStyle.color)

                console.log(box1.firstElementChild)
            }
        </script>
    </body>
```

### 12.其他读取样式的方法

**元素.clientHeight
元素.clientWidth**
    - 获取元素内部的宽度和高度（包括内容区和内边距）

**元素.offsetHeight
元素.offsetWidth**
    - 获取元素的可见框的大小（包括内容区、内边距和边框）

**元素.scrollHeight
元素.scrollWidth**
    - 获取元素滚动区域的大小

**元素.offsetParent**
    - 获取元素的定位父元素
    - 定位父元素：离当前元素最近的开启了定位的祖先元素，
                        如果所有的元素都没有开启定位则返回body

**元素.offsetTop
元素.offsetLeft**
    - 获取元素相对于其定位父元素的偏移量

**元素.scrollTop
元素.scrollLeft**
    - 获取或设置元素滚动条的偏移量

### 13.事件对象
event 事件
- 事件对象
    - 事件对象是有浏览器在事件触发时所创建的对象，这个对象中封装了事件相关的各种信息
    - 通过事件对象可以获取到事件的详细信息，比如：鼠标的坐标、键盘的按键..
    - 浏览器在创建事件对象后，会将事件对象作为响应函数的参数传递，所以我们可以在事件的回调函数中定义一个形参来接收事件对象
```javascript
            box1.addEventListener("mousemove", event => {
                console.log(event.clientX, event.clientY)

                box1.textContent = event.clientX + "," + event.clientY
            })
```

在DOM中存在着多种不同类型的事件对象
- 多种事件对象有一个共同的祖先 Event
    - ==event.target 触发事件的对象==
    - ==event.currentTarget 绑定事件的对象（同this）==
    - ==event.stopPropagation() 停止事件的传导==
    - ==event.preventDefault() 取消默认行为==
- 事件的冒泡（bubble）
    - 事件的冒泡就是指事件的==向上传到==
    - 当元素上的某个事件被触发后，其祖先元素上的相同事件也会同时被触发
    - 冒泡的存在大大的简化了代码的编写，但是在一些场景下我们并不希望冒泡存在
,不希望事件冒泡时，可以通过事件对象来取消冒泡

```javascript
        <style>
            #box1 {
                width: 300px;
                height: 300px;
                background-color: greenyellow;
            }

            #box2 {
                width: 250px;
                height: 250px;
                background-color: #ff0;
            }

            #box3 {
                width: 200px;
                height: 200px;
                background-color: orange;
            }
        </style>
    </head>
    <body>
        <div id="box1">
            <div id="box2">
                <div id="box3"></div>
            </div>
        </div>

        <a id="chao" href="https://lilichao.com">超链接</a>
        <script>

            const box1 = document.getElementById("box1")
            const box2 = document.getElementById("box2")
            const box3 = document.getElementById("box3")
            const chao = document.getElementById("chao")

            chao.addEventListener("click", (event) => {

                event.preventDefault() // 取消默认行为

                alert("被点了~~~")

            })

            box1.addEventListener("click", function (event) {
                // alert(event)
                /* 
                在事件的响应函数中：
                    event.target 表示的是触发事件的对象
                    this 绑定事件的对象
            */
                // console.log(event.target)
                // console.log(this)

                console.log(event.currentTarget)

                // alert("Hello 我是box1")
            })

            // box2.addEventListener("click", function(event){
            //     event.stopPropagation()
            //     alert("我是box2")
            // })

            // box3.addEventListener("click", function(event){
            //     event.stopPropagation() // 取消事件的传到
            //     alert("我是box3")
            // })
        </script>
    </body>
```

### 14.事件的委派

>我一个希望：
>    只绑定一次事件，既可以让所有的超链接，包括当前的和未来新建的超链接都具有这些事件

思路：
可以将事件统一绑定给document，这样点击超链接时由于事件的冒泡，会导致document上的点击事件被触发，这样只绑定一次，所有的超链接都会具有这些事件
委派就是将本该绑定给多个元素的事件，统一绑定给document，这样可以降低代码复杂度方便维护
```javascript
            const list = document.getElementById("list")
            const btn = document.getElementById("btn")

            // 获取list中的所有链接
            const links = list.getElementsByTagName("a")


            document.addEventListener("click", (event) => {
                // 在执行代码前，先来判断一下事件是由谁触发
                // 检查event.target 是否在 links 中存在

                // console.log(Array.from(links))

                if([...links].includes(event.target)){
                    alert(event.target.textContent)
                }                
            })
```

### 15.事件的捕获
事件的传播机制：
- 在DOM中，事件的传播可以分为三个阶段：
    1.捕获阶段 （由祖先元素向目标元素进行事件的捕获）（默认情况下，事件不会在捕获阶段触发）
    2.目标阶段 （触发事件的对象）
    3.冒泡阶段 （由目标元素向祖先元素进行事件的冒泡）

- 事件的捕获，指事件从外向内的传导，
    当前元素触发事件以后，会先从当前元素最大的祖先元素开始向当前元素进行事件的捕获

- 如果希望在捕获阶段触发事件，可以将addEventListener的第三个参数设置为true
    一般情况下我们不希望事件在捕获阶段触发，所有通常都不需要设置第三个参数

### 16.BOM
BOM
- 浏览器对象模型
- BOM为我们提供了一组对象，通过这组对象可以完成对浏览器的各种操作
- BOM对象：
    - Window —— 代表浏览器窗口（全局对象）
    - Navigator —— 浏览器的对象（可以用来识别浏览器）
    - Location —— 浏览器的地址栏信息
    - History —— 浏览器的历史记录（控制浏览器前进后退）
    - Screen —— 屏幕的信息

- BOM对象都是作为window对象的属性保存的，所以可以直接在JS中访问这些对象

### 17.定时器
通过定时器，可以使代码在指定时间后执行
- 设置定时器的方式有两种：
1. **setTimeout()**
    - 参数：
        1. 回调函数（要执行的代码）
        2. 间隔的时间（毫秒）
    - 关闭定时器
    clearTimeout()

2. **setInterval() (每间隔一段时间代码就会执行一次)**
    - 参数：
        1. 回调函数（要执行的代码）
        2. 间隔的时间（毫秒）
    - 关闭定时器
     **clearInterval()**
```javascript

            const timer = setTimeout(()=>{
                alert("我是定时器中的代码")
            }, 3000)

            // clearTimeout(timer)


            const numH1 = document.getElementById("num")

            // let num = 0

            // const timer = setInterval(() => {
            //     num++
            //     numH1.textContent = num

            //     if(num === 200){
            //         clearInterval(timer)
            //     }
            // }, 30)
```
### 18.事件循环
事件循环（event loop）
- 函数在每次执行时，都会产生一个执行环境
- 执行环境负责存储函数执行时产生的一切数据
- 问题：函数的执行环境要存储到哪里呢？
    - 函数的执行环境存储到了一个叫做调用栈的地方
    - 栈，是一种数据结构，特点 后进先出
    - 队列，是一种数据结构，特点 先进先出
                    
调用栈（call stack）
- 调用栈负责存储函数的执行环境
- 当一个函数被调用时，它的执行环境会作为一个栈帧,插入到调用栈的栈顶，函数执行完毕其栈帧会自动从栈中弹出

消息队列
- 消息队列负责存储将要执行的函数
- 当我们触发一个事件时，其响应函数并不是直接就添加到调用栈中的,因为调用栈中有可能会存在一些还没有执行完的代码
- 事件触发后，JS引擎是将事件响应函数插入到消息队列中排队
                            
