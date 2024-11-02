# 基本
## 响应事件 
你可以通过在组件中声明 事件处理 函数来响应事件：
**可分为简单组件，复杂组件**
### 类回顾
```javascript
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age
    }
    sayHello(){
        console.log(`Hello, my name is ${this.name}`);
    }
}
```
**name** 和 **age** 是存储在 Person 类的**实例对象**中的属性。每当你创建一个新的 Person 对象时，这些属性会被初始化并存储在该对象中
sayHello 是定义在 Person 类**原型**（（上的方法。所有 Person 类的实例对象都可以访问这个方法

# 坑
## 传递prop时数字要加{}
```javascript
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```
在 React 中，传递 props 时使用 `{}` 和不使用 `{}` 的区别在于语法和数据的类型。

1. **使用 `{}`**: 当你写 `guest={1}` 时，你是在传递一个 JavaScript 表达式。这个表达式可以是数字、字符串、对象等。在这个例子中，`1` 是一个数字，所以用 `{}` 将其传递给 `Cup` 组件。

2. **不使用 `{}`**: 如果你写 `guest=1`，React 会将 `1` 视为一个字符串，而不是数字。因为在 HTML 中，所有属性都是字符串。如果你在 props 中不加 `{}`，React 会将其视为一个字符串类型的 prop，而在你的 `Cup` 组件中，这个值会被当做字符串来处理。

所以，如果你想传递数字类型的值，正确的写法是 `guest={1}`。如果你写 `guest="1"` 或者 `guest={1}`，在使用时，`guest` 的值在组件中是相同的，但类型不同，可能会导致类型不匹配的错误或逻辑上的问题。

在你的例子中，应该始终使用 `{}` 来传递任何非字符串的 JavaScript 表达式。如果要传递一个字符串，可以直接写 `guest="1"`。总结一下：

- **数字**: `guest={1}`
- **字符串**: `guest="1"`

这样可以确保你在组件中获得期望的类型。
## 保持组件纯粹
这段代码很坑很坑，你以为输出是：**1，2，3**，NoNoNO,实际上是**2，4，6**
```javascript
let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

>Tea cup for guest #2
Tea cup for guest #4
Tea cup for guest #6

why?
文档给出的解释为
>React 提供了 **“严格模式”**，在严格模式下开发时，它将会调用每个组件函数**两次**。通过重复调用组件函数，严格模式有助于找到违反这些规则的组件。
>
>我们注意到，原始示例显示的是 “Guest #2”、“Guest #4” 和 “Guest #6”，而不是 “Guest #1”、“Guest #2” 和 “Guest #3”。原来的函数并不纯粹，因此调用它两次就出现了问题。但对于修复后的纯函数版>本，即使调用该函数两次也能得到正确结果。纯函数仅仅执行计算，因此调用它们两次不会改变任何东西 — 就像两次调用 double(2) 并不会改变返回值，两次求解 y = 2x 不会改变 y 的值一样。相同的输入，总>是返回相同的输出。
>
>严格模式在生产环境下不生效，因此它不会降低应用程序的速度。如需引入严格模式，你可以用 <React.StrictMode> 包裹根组件。一些框架会默认这样做。

## state
### state如一张快照
“正在渲染” 就意味着 React 正在调用你的组件——一个函数。你从该函数返回的 JSX 就像是在某个时间点上 UI 的快照。它的 props、事件处理函数和内部变量都是 根据**当前渲染时的 state**被计算出来的。

与照片或电影画面不同，你返回的 UI “快照”是可交互的。它其中包括类似事件处理函数的逻辑，这些逻辑用于指定如何对输入作出响应。React 随后会更新屏幕来匹配这张快照，并绑定事件处理函数。因此，按下按钮就会触发你 JSX 中的点击事件处理函数。

当 React 重新渲染一个组件时：

- React 会再次调用你的函数
- 函数会返回新的 JSX 快照
- React 会更新界面以匹配返回的快照

作为一个组件的记忆，state 不同于在你的函数返回之后就会消失的普通变量。state 实际上“活”在 React 本身中——就像被摆在一个架子上！——位于你的函数之外。当 React 调用你的组件时，它会为特定的那一次渲染提供一张 state 快照。你的组件会在其 JSX 中返回一张包含一整套新的 props 和事件处理函数的 UI 快照 ，其中所有的值都是 根据**那一次渲染中 state 的值** 被计算出来的！
简单看一个例子

```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```
按下按钮number加几？是3吗？实际上是1。
这是因为
>设置 state 只会为下一次渲染变更 state 的值。在第一次渲染期间，number 为 0。这也就解释了为什么在 那次渲染中的 onClick 处理函数中，即便在调用了 setNumber(number + 1) 之后，number 的值也仍然是 0：
以下是这个按钮的点击事件处理函数通知 React 要做的事情：

>setNumber(number + 1)：number 是 0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
setNumber(number + 1)：number 是0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
setNumber(number + 1)：number 是0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
尽管你调用了三次 setNumber(number + 1)，但在 这次渲染的 事件处理函数中 number 会一直是 0，所以你会三次将 state 设置成 1。这就是为什么在你的事件处理函数执行完以后，React 重新渲染的组件中的 number 等于 1 而不是 3。

也就是
```javascript
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```
等同于
```javascript
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```
**一个 state 变量的值永远不会在一次渲染的内部发生变化**