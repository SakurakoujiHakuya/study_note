**想到哪里写到哪里**
# vue路由
## 设置网页标题
``` javascript 
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta:{
                title:'首页'
            }
```
``` javascript 
router.beforeEach((to, from, next) => {
    //访问路由组件的之前,进度条开始动
    Nprogress.start();
    //动态设置网页左上角的标题
    document.title = `尚医通-${to.meta.title}`;
    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    //用户登陆了
    if (token) {
        next();
    } else {
        //用户未登录
        if (whiteList.includes(to.path)) {
            next();
        } else {
            //登录组件显示不来
            userStore.visiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } })
        }

    }

});
```
## 路由鉴权
``` javascript
//路由鉴权:就是路由能不能被访问到权限设置->全局守卫完成
//引入路由器
import router from "./router";
//引入进度条
import Nprogress from 'nprogress';
//引入用户相关的仓库
import useUserStore from '@/store/modules/user';
//引入大仓库
import pinia from '@/store'
let userStore = useUserStore(pinia);
//引入进度条的样式
import "nprogress/nprogress.css"
//进度条的加载小圆球不要
Nprogress.configure({ showSpinner: false });
//存储用户未登录可以访问路由得路径
let whiteList = ["/home", '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];
//添加相应的全局守卫
//前置守卫
router.beforeEach((to, from, next) => {
    //访问路由组件的之前,进度条开始动
    Nprogress.start();
    //动态设置网页左上角的标题
    document.title = `尚医通-${to.meta.title}`;
    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    //用户登陆了
    if (token) {
        next();
    } else {
        //用户未登录
        if (whiteList.includes(to.path)) {
            next();
        } else {
            //登录组件显示不来
            userStore.visiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } })
        }

    }

});

//后置路由
router.afterEach((to, from) => {
    //访问路由组件成功,进度条消息
    Nprogress.done();
})
```
# pinia
## 写法
### 选项示
```javascript
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
### 组合式
```javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```
## 从store解构
从 Store 解构
为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：
```javascript
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```
# 好用插件
## pinia持久化插件
- 部署
    ```javascript
    npm i pinia-plugin-persistedstate
    ```
- 应用
    ```javascript
    //应用将插件添加到你的 pinia 实例中
    import { createPinia } from 'pinia'
    import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    ```
- 用法
    ```javascript
    //在声明您的store时，请将新persist选项设置为 true。
    import { defineStore } from 'pinia'
    import { ref } from 'vue'

    export const useStore = defineStore(
    'main',
    () => {
        const someState = ref('hello pinia')
        return { someState }
    },
    {
        persist: true,
    },
    )
    ```
    ```javascript
    import { defineStore } from 'pinia'
    export const useStore = defineStore('main', {
    state: () => {
        return {
        someState: 'hello pinia',
        }
    },
    persist: true,
    })
    ```