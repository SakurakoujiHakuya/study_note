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
# 坑
## 典中典之vue的偷懒导致本地图片切换异常
**什么情况下会产生？**
先贴一段代码
```javascript
<template>
    <div class="security">
        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" multiple />
        <div class="images-container">
            <div class="image-wrapper">
                <img v-show="diagnosisStore.leftImg !== ''" :src="diagnosisStore.leftImg" alt="" />
                <button v-show="diagnosisStore.leftImg !== ''" @click="openImage(diagnosisStore.leftImg)">打开图片</button>
            </div>
            <div class="image-wrapper">
                <img v-show="diagnosisStore.rightImg !== ''" :src="diagnosisStore.rightImg" alt=""
                    class="post-diagnosis" />
                <button v-show="diagnosisStore.rightImg !== ''"
                    @click="openImage(diagnosisStore.rightImg)">打开图片</button>
            </div>
        </div>
        <div class="eventButton">
            <button class="upload-button" @click="triggerFileUpload">选择图像</button>
        </div>
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
            <p>正在处理，请稍候...</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';
import useDiagnosisStore from '../store/diagnosis';
const diagnosisStore = useDiagnosisStore();
const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref<boolean>(false);

const onFileChange = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        // 清空图片路径
        diagnosisStore.leftImg = '';
        diagnosisStore.rightImg = '';
        isLoading.value = true; // 开始加载

        // 将文件转换为 URL 并存储
        const file = files[0];

        // 上传图片并保存到服务器
        const formData = new FormData();
        formData.append('file', file, 'pt.jpg');
        await axios.post('/upload-diagnosis', formData);

        // 运行 Python 脚本
        await axios.post('/run-script');

        // 添加时间戳以防止缓存
        const timestamp = new Date().getTime();

        // 更新左侧的图片
        diagnosisStore.leftImg = `/input/pt.jpg?timestamp=${timestamp}`;

        // 更新右侧的图片
        diagnosisStore.rightImg = `/output/feature_map_layer_0.png?timestamp=${timestamp}`;

        isLoading.value = false; // 结束加载
    }
};
```
可以注意到**diagnosisStore.leftImg**的值要么为''要么为/input/pt.jpg，但是即使是一直等于/input/pt.jpg效果也是一样的，直接说重点：当/input/pt.jpg这个图片发生变化，被替换为其他图片时，vue并不知道这张图片发生了变化，所以页面上显示的还是最开始的图片。我试过各自方法：例如让**diagnosisStore.leftImg**等于''，然后再等于/input/pt.jpg，或者说给前面的容器一个:key=xxx，然后不断更新xxx的值等方法，都不顶用，vue可能记住了/input/pt.jpg一开始的值，然后将其缓存，之后只要路径还是/input/pt.jpg就会从缓存里去取值，这就导致了图片更新的失败/
**解决办法：**
像这样加个时间戳，然后一切都搞定了
```javascript
       const timestamp = new Date().getTime();

        // 更新左侧的图片
        diagnosisStore.leftImg = `/input/pt.jpg?timestamp=${timestamp}`;
```