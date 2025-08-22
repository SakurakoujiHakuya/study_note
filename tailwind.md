# tailwind
## 简介
<mark>原子化css很强就对了</mark>
## 值得关注的特性
1.实用优先
  - 不需要想类名
  - 开发速度很快
  - 打包体积小-只包含实际使用过的类
  - 约束性设计，自定义品牌色，字体大小间距等

2.响应式设计
| Breakpoint prefix | Minimum width      | CSS                          |
|-------------------|--------------------|------------------------------|
| sm                | 40rem (640px)      | `@media (width >= 40rem) { ... }`  |
| md                | 48rem (768px)      | `@media (width >= 48rem) { ... }`  |
| lg                | 64rem (1024px)     | `@media (width >= 64rem) { ... }`  |
| xl                | 80rem (1280px)     | `@media (width >= 80rem) { ... }`  |
| 2xl               | 96rem (1536px)     | `@media (width >= 96rem) { ... }`  |

 - 移动优先
 - 一目了然

3. 状态变体
     - 状态前缀(hover:,focus,active,group-hover)
     - 强大的group和Peer 

4. 黑暗模式
5. 自定义
6. 一些函数指令
     - @apply,可以将多个工具类提取到一个自定义的css类中，不推荐大量使用，复用应该以组件为起点