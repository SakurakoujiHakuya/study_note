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

## 性能优化

### 分包懒加载
```javascript
import Discover from '@/views/discover';
import Mine from '@/views/mine';
import Focus from '@/views/focus';
import Download from '@/views/download';
```
改成
```javascript
import { lazy } from 'react';

const Discover = lazy(() => import('@/views/discover'));
const Mine = lazy(() => import('@/views/mine'));
const Focus = lazy(() => import('@/views/focus'));
const Download = lazy(() => import('@/views/download'));
```
#### **这种写法的好处**

这里使用了 React 的 `lazy` 函数和动态 `import`，实现了**路由组件的懒加载**。这种写法有以下好处：

---

##### **1. 减少初始加载时间**
- **原理**：懒加载会将每个路由组件单独打包成一个文件（代码分割），只有在用户访问对应路由时才会加载该组件。
- **好处**：初始加载时只加载必要的代码，减少了主包的体积，从而提升了页面的加载速度。

---

##### **2. 提高性能**
- **按需加载**：只有用户访问某个路由时，才会加载对应的组件代码，避免加载未使用的代码。
- **用户体验**：对于大型应用，懒加载可以显著减少首屏加载时间，提升用户体验。

---

##### **3. 简化代码分割**
- 使用 `lazy` 和动态 `import`，可以轻松实现代码分割，而无需手动配置 Webpack 或其他打包工具。

---

##### **4. 与 React 的 Suspense 配合**
- React 的 `lazy` 通常与 `Suspense` 一起使用，可以在组件加载时显示一个占位符（如加载动画），提升用户体验。

---

#### **注意事项**

##### **1. 必须与 `Suspense` 一起使用**
- `lazy` 加载的组件在加载过程中会返回一个 `Promise`，因此需要用 `Suspense` 包裹，提供加载状态的占位符。
- 示例：
  ```tsx
  import { Suspense } from 'react';

  const App = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 路由配置 */}
      </Routes>
    </Suspense>
  );
  ```

##### **2. 动态 `import` 的路径**
- 动态 `import` 的路径必须是静态的，不能是动态变量，否则会导致打包失败或无法正确加载模块。

##### **3. SEO 问题**
- 懒加载的组件在首次加载时依赖 JavaScript，这可能会影响搜索引擎的抓取和索引。
- **解决方法**：对于需要 SEO 的页面，可以使用服务端渲染（SSR）或静态生成（SSG）。

##### **4. 异常处理**
- 如果懒加载的组件加载失败（如网络问题），需要提供错误边界来捕获错误并显示友好的提示。
- 示例：
  ```tsx
  import { Suspense } from 'react';

  const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    try {
      return <>{children}</>;
    } catch (error) {
      return <div>Error loading component</div>;
    }
  };

  const App = () => (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* 路由配置 */}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
  ```

##### **5. 可能的闪烁问题**
- 如果懒加载的组件加载时间较长，用户可能会看到加载占位符闪烁。
- **优化方法**：
  - 使用更快的网络或 CDN 加速资源加载。
  - 提供更友好的加载占位符（如骨架屏）。

---

#### **总结**

##### **好处**：
- 减少初始加载时间，提升性能。
- 实现代码分割，按需加载。
- 简化代码分割的实现。

##### **注意事项**：
- 必须与 `Suspense` 一起使用。
- 动态 `import` 路径必须是静态的。
- 注意 SEO 和加载失败的处理。

这种写法非常适合大型应用，尤其是路由较多且组件体积较大的场景，可以显著提升性能和用户体验。
### memo
在 React 中，`memo` 是一个高阶组件（Higher-Order Component），用于优化函数组件的性能。它通过**浅比较**（shallow comparison）来决定是否重新渲染组件。

---

#### **`memo` 的作用**
1. **避免不必要的重新渲染**：
   - 当父组件重新渲染时，如果传递给子组件的 `props` 没有发生变化，`memo` 会阻止子组件的重新渲染，从而提高性能。

2. **浅比较 `props`**：
   - `memo` 默认会对传递给组件的 `props` 进行浅比较（shallow comparison）。
   - 如果 `props` 的值没有变化（对于对象和数组是引用未变），组件不会重新渲染。

---

#### **使用场景**
- **适合场景**：
  - 子组件的渲染开销较大（如复杂的 UI 或计算）。
  - 父组件频繁更新，但子组件的 `props` 很少变化。

- **不适合场景**：
  - 子组件的 `props` 经常变化。
  - 子组件的渲染开销很小，使用 `memo` 可能得不偿失。

---

#### **代码解析**
在你的代码中：

```tsx
export default memo(Download);
```

- `memo` 包裹了 `Download` 组件。
- 当父组件重新渲染时，React 会检查 `Download` 组件的 `props` 是否发生变化：
  - 如果 `props` 没有变化，`Download` 组件不会重新渲染。
  - 如果 `props` 发生变化，`Download` 组件会重新渲染。

---

#### **示例对比**
##### **未使用 `memo` 的情况**：
即使 `props` 没有变化，`Download` 组件也会在父组件重新渲染时重新渲染。

##### **使用 `memo` 的情况**：
只有当 `props` 的值发生变化时，`Download` 组件才会重新渲染。

---

#### **注意事项**
1. **浅比较的局限性**：
   - 如果 `props` 中包含复杂数据结构（如对象或数组），即使内容相同，但引用不同，`memo` 仍会触发重新渲染。
   - 解决方法：可以通过 `React.memo` 的第二个参数 `areEqual` 提供自定义比较函数。

   示例：
   ```tsx
   export default memo(Download, (prevProps, nextProps) => {
     return prevProps.name === nextProps.name &&
            prevProps.age === nextProps.age &&
            prevProps.height === nextProps.height;
   });
   ```

2. **不要过度使用**：
   - 如果组件的渲染开销很小，使用 `memo` 可能会增加不必要的复杂性。

---

#### **总结**
`memo` 是一个性能优化工具，用于避免不必要的重新渲染。它适用于渲染开销较大的组件，或者当父组件频繁更新但子组件的 `props` 很少变化时。合理使用 `memo` 可以显著提高 React 应用的性能。


# 插件
## 状态管理
### zustand
- 文档地址
 https://ouweiya.github.io/zustand-zh/docs/guides/auto-generating-selectors
- 部署
  ```javascript
  npm i zustand
  ```
- 示例
  ```javascript
  import { create } from 'zustand'
  const useStore = create((set) => ({
    bears: 0,
    addBear: () => set((state) => ({ bears: state.bears + 1 })),
    removeBear: () => set((state) => ({ bears: 0 }))
  }))
  function BearCounter() {
    const bears = useStore(state => state.bears)
    return <h1>{bears}</h1>
  }
  export default () => {
    return (
      <div>
        <BearCounter />
        <button onClick={useStore((state) => state.addBear)}>add</button>
        <button onClick={useStore((state) => state.removeBear)}>remove</button>
      </div >
    )
  }

  ```
#### 注意的点
##### 不必要的渲染
```javascript
       const { cats, increaseBigCats, increaseSmallCats, summary } = useCatStore()//可能引起不必要的渲染，影响性能
```
```javascript
    const bigCats = useCatStore(state => state.cats.bigCats)//而这样不会
```
##### ts的括号 需要在<>后补上括号
```javascript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TCatStoreState = {
    cats: {
        bigCats: number;
        smallCats: number;
    }
    increaseBigCats: () => void;
    increaseSmallCats: () => void;
    summary: () => number;
};


export const useCatStore = create<TCatStoreState>()(immer((set, get) => ({
    cats: {
        bigCats: 0,
        smallCats: 0
    },
    increaseBigCats: () => set((state) => { state.cats.bigCats++ }),
    increaseSmallCats: () => set((state) => { state.cats.smallCats++ }),
    summary: () => get().cats.bigCats + get().cats.smallCats
})));
```
# 技巧
## 编辑代码片段
可以编写例如这样的代码片段
```javascript
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
interface Iprops {
  children?: ReactNode;
}

// 开发这种写法更好
const Template: FC<Iprops> = () => {
  return (
    <div>
      <h1>template</h1>
    </div>
  );
};

export default memo(Template);
```
然后将其丢入snippet-generator
https://snippet-generator.app
得到这样的代码片段
```javascript
"react typescript": {
  "prefix": "tsreact",
  "body": [
    "import type { FC, ReactNode } from 'react';",
    "import { memo } from 'react';",
    "interface Iprops {",
    "  children?: ReactNode;",
    "}",
    "",
    "const ${1:home}: FC<Iprops> = () => {",
    "  return (",
    "    <div>",
    "      <h1>${1:home}</h1>",
    "    </div>",
    "  );",
    "};",
    "",
    "export default memo(${1:home});",
    ""
  ],
  "description": "react typescript"
}
```
然后使用vscode文件-首选项-配置代码片段，将其粘贴进去