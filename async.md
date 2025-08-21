# 收集的Async/Await小技巧
## 1.Error Boundary（优雅的失败恢复）
### 不做Error Boundary
```javaScript
async function processUserData(userId) {
  const user = await fetchUser(userId);
  const preferences = await fetchPreferences(userId);
  const recommendations = await generateRecommendations(user, preferences);
​
  return { user, preferences, recommendations };
  // 如果任何一步失败，整个函数都会失败
}
```

### 优雅降级
```javaScript
async function processUserData(userId) {
  const results = await Promise.allSettled([
    fetchUser(userId),
    fetchPreferences(userId).catch(() => getDefaultPreferences()),
  ]);
​
  const [userResult, preferencesResult] = results;
​
  if (userResult.status === 'rejected') {
    /* ================================================
     * 🎯 小技巧：仅关键失败会阻止执行
     * 用户数据是必需的，因此立即抛出错误
     * ================================================ */
    throw new Error('用户数据必需，但不可用');
  }
​
  const user = userResult.value;
  const preferences = preferencesResult.value;
​
  /* ================================================
   * 🎯 小技巧：可选功能优雅失败
   * 推荐功能提升用户体验，但非关键
   * ================================================ */
  const recommendations = await generateRecommendations(user, preferences)
    .catch(error => {
      console.warn('推荐数据不可用:', error.message);
      return []; // 返回空数组而非崩溃
    });
​
  return { user, preferences, recommendations };
}
```
妙在哪里： Promise.allSettled 允许部分操作失败而其他操作成功。关键数据（请求失败）会抛出错误，可选数据则优雅降级。这样即便外部服务出问题，应用仍可运行。
```javaScript
class DataService {
  async processUserWithFallbacks(userId) {
    const strategies = [
      /* ================================================
       * 🎯 高级技巧：多重回退策略
       * 主 API → 缓存 → 默认值
       * ================================================ */
      () => this.fetchFromPrimaryAPI(userId),
      () => this.fetchFromCache(userId),
      () => this.generateDefaultUser(userId)
    ];
​
    for (const strategy of strategies) {
      try {
        const result = await strategy();
        if (this.isValidUserData(result)) {
          return result;
        }
      } catch (error) {
        console.warn('策略失败，尝试下一个:', error.message);
      }
    }
​
    throw new Error('所有用户数据策略已耗尽');
  }
}

```
真实应用场景：

- 数据面板加载时显示部分数据（而不是某个请求失败，整个面板崩了）
- 电商结算可有可无的功能崩了就崩了，别影响主流程
- 社交媒体动态内容优雅加载（小破站悬浮的广告崩了，别影响视频播放）
- 银行应用中带有交易回退机制（有 planB）

小技巧： 使用有意义的错误信息帮助开发者调试，例如：“用户数据不可用”这样的提示语比“请求失败”更好。

## 2.异步队列模式（受控并发）
小技巧： 大佬不会让异步操作失控。他们使用并发控制来防止服务器过载的同时，保持最佳性能。

### 并行混乱
```javaScript
async function processFiles(files) {
  // This might overwhelm the server with 100 concurrent requests
  const results = await Promise.all(
    files.map(file => uploadFile(file))
  );
  return results;
}
```
### 受控批处理
```javaScript
async function processFiles(files, concurrency = 3) {
  const results = [];
  const queue = [...files];
​
  while (queue.length > 0) {
    /* ================================================
     * 🎯 技巧：按受控批次处理
     * 防止服务器过载和速率限制
     * ================================================ */
    const batch = queue.splice(0, concurrency);
​
    const batchResults = await Promise.all(
      batch.map(async (file, index) => {
        try {
          /* ================================================
           * 🎯 技巧：每个文件单独处理错误
           * 单个上传失败不会中断整个批次
           * ================================================ */
          const result = await uploadFile(file);
          return { success: true, file: file.name, data: result };
        } catch (error) {
          return { 
            success: false, 
            file: file.name, 
            error: error.message 
          };
        }
      })
    );
​
    results.push(...batchResults);
​
    /* ================================================
     * 🎯 技巧：进度报告优化用户体验
     * 用户看到增量进度，而不仅是加载
     * ================================================ */
    const completed = results.length;
    const total = files.length;
    console.log(`Progress: ${completed}/${total} files processed`);
  }
​
  return results;
}
```
受控并发考虑到服务器性能的同时提供并行处理能力。
```javaScript
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
​
  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      /* ================================================
       * 🎯 高级技巧：动态队列管理
       * 自动管理执行而不阻塞
       * ================================================ */
      this.queue.push({
        fn: asyncFunction,
        resolve,
        reject
      });
​
      this.process();
    });
  }
​
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
​
    this.running++;
    const { fn, resolve, reject } = this.queue.shift();
​
    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // 处理下一个任务
    }
  }
}
​
// 使用示例
const queue = new AsyncQueue(3);
const uploadPromises = files.map(file => 
  queue.add(() => uploadFile(file))
);
const results = await Promise.all(uploadPromises);
```
在此基础上，给每个任务增加优先级的概念，结合排序算法，比如最小堆排序。就能有一个按照优先级处理的异步队列。

真实应用场景：

- 图像处理与上传
- API 数据同步
- 批量邮件发送
- 大数据集处理

高级小技巧： 根据系统性能动态调整并发数：从 3 开始，如果响应快可以增加，如果速度慢则降低

## 3.超时逃生策略（永不无限挂起）
专业开发者从不完全信任外部 API。他们总是实现超时策略，以防应用程序无限挂起。

## 无限等待
```javaScript
async function fetchCriticalData() {
  // 如果这个 API 崩了，你的应用会无限挂起
  const data = await fetch('/api/critical-data');
  return data.json();
}
```

## 带回退的超时策略
```javaScript
function withTimeout(promise, ms, fallback = null) {
  return new Promise((resolve, reject) => {
    /* ================================================
     * 🎯 小技巧：Promise race
     * 谁先完成就算赢，防止挂起
     * ================================================ */
    const timeout = setTimeout(() => {
      if (fallback !== null) {
        resolve(fallback);
      } else {
        reject(new Error(`操作超时，超过 ${ms} 毫秒`));
      }
    }, ms);
​
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeout));
  });
}
​
async function fetchCriticalData() {
  try {
    /* ================================================
     * 🎯 小技巧：多重超时策略
     * UI 使用快速超时，保证回退机制
     * ================================================ */
    const response = await withTimeout(
      fetch('/api/critical-data'),
      5000 // 5 秒超时
    );
​
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
​
    /* ================================================
     * 🎯 小技巧：JSON 解析也要设置超时
     * 网络慢或解析可能挂起
     * ================================================ */
    const data = await withTimeout(
      response.json(),
      2000 // JSON 解析 2 秒超时
    );
​
    return data;
  } catch (error) {
    if (error.message.includes('timed out')) {
      // 回退到缓存数据或默认值
      return getCachedData() || getDefaultData();
    }
    throw error;
  }
}
```
JavaScript 的 Promise.race() 行为允许超时与请求同时竞争。先完成的那个“赢”，防止无限挂起，同时提供回退方案。
```javaScript
class ResilientFetcher {
  constructor(options = {}) {
    this.defaultTimeout = options.timeout || 5000;
    this.retryAttempts = options.retries || 3;
    this.retryDelay = options.retryDelay || 1000;
  }
​
  async fetchWithRetry(url, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
​
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        /* ================================================
         * 🎯 高级技巧：阶梯性地判断超时
         * 每次重试等待时间增加，尊重服务器恢复
         * ================================================ */
        const response = await withTimeout(
          fetch(url, options),
          timeout
        );
​
        if (response.ok) {
          return response;
        }
​
        if (response.status >= 500 && attempt < this.retryAttempts) {
          // 服务器错误，阶梯性地重试
          await this.delay(this.retryDelay * Math.pow(2, attempt - 1));
          continue;
        }
​
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        if (attempt === this.retryAttempts) {
          throw error;
        }
​
        console.warn(`第 ${attempt} 次尝试失败：`, error.message);
        await this.delay(this.retryDelay);
      }
    }
  }
​
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

```
实际应用场景：

- 支付（处理超时）
- 实时聊天
- 不可靠服务的 API 集成
- 网络条件差的 app

针对不同操作使用不同的超时值，例如 UI 交互 2 秒，文件上传 10 秒，数据处理 30 秒。

## 4.异步初始化（竞态条件预防）
专业开发者使用初始化来消除竞态条件，确保异步资源在需要时始终可用。

### 竞态条件泛滥
```javaScript
class DataService {
  constructor() {
    this.data = null;
    this.loadData(); // 直接触发异步请求，危险！
  }
​
  async loadData() {
    this.data = await fetch('/api/data').then(r => r.json());
  }
​
  getData() {
    return this.data; // 可能为 null，如果调用过早
  }
}
```
### 基于 Promise 的初始化
```javaScript
class DataService {
  constructor() {
    /* ================================================
     * 🎯 小技巧：存储 Promise 而非结果
     * 允许多个消费者等待同一个异步操作
     * ================================================ */
    this.dataPromise = this.initializeData();
    this.cache = new Map();
  }
​
  async initializeData() {
    try {
      /* ================================================
       * 🎯 小技巧：单次初始化 + 回退策略
       * 启动时优雅处理网络错误
       * ================================================ */
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`加载数据失败: ${response.status}`);
      }
​
      const data = await response.json();
​
      /* ================================================
       * 🎯 小技巧：加载时验证数据结构
       * 防止因返回数据格式错误导致运行时异常
       * ================================================ */
      if (!this.isValidData(data)) {
        console.warn('数据结构无效，使用默认值');
        return this.getDefaultData();
      }
​
      return data;
    } catch (error) {
      console.error('数据初始化失败:', error);
      return this.getDefaultData();
    }
  }
​
  async getData() {
    /* ================================================
     * 🎯 小技巧：始终返回 Promise
     * 完全消除时序问题
     * ================================================ */
    return await this.dataPromise;
  }
​
  async getItem(id) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
​
    /* ================================================
     * 🎯 小技巧：在操作前等待初始化完成
     * 确保数据已加载后再查找条目
     * ================================================ */
    await this.dataPromise;
    const item = await this.fetchItem(id);
    this.cache.set(id, item);
    return item;
  }
}

```
将 Promise 存储起来而不是存储最终结果意味着所有使用者都会等待同一次初始化。无论方法何时被调用，它们要么立即获得数据，要么等待数据加载完成后再返回。
```javaScript
// 高级实现
​
class AdvancedDataService {
  constructor() {
    this.state = 'initializing';
    this.initPromise = this.initialize();
    this.eventEmitter = new EventTarget();
  }
​
  async initialize() {
    try {
      this.state = 'loading';
      this.emit('stateChange', { state: 'loading' });
​
      /* ================================================
       * 🎯 高级技巧：渐进式初始化
       * 先加载关键数据，再加载额外数据
       * ================================================ */
      const critical = await this.loadCriticalData();
      this.state = 'partial';
      this.emit('stateChange', { state: 'partial', data: critical });
​
      const optional = await this.loadOptionalData();
      this.state = 'complete';
      this.emit('stateChange', { state: 'complete', data: { ...critical, ...optional } });
​
      return { ...critical, ...optional };
    } catch (error) {
      this.state = 'error';
      this.emit('stateChange', { state: 'error', error });
      throw error;
    }
  }
​
  async waitForState(targetState) {
    if (this.state === targetState) return;
​
    return new Promise(resolve => {
      const handler = (event) => {
        if (event.detail.state === targetState) {
          this.eventEmitter.removeEventListener('stateChange', handler);
          resolve(event.detail);
        }
      };
      this.eventEmitter.addEventListener('stateChange', handler);
    });
  }
​
  emit(event, data) {
    this.eventEmitter.dispatchEvent(
      new CustomEvent(event, { detail: data })
    );
  }
}
​
// 使用示例
const service = new AdvancedDataService();
await service.waitForState('partial'); // 可开始使用基础功能
// 后续...
await service.waitForState('complete'); // 全部功能可用
```
玩游戏的时候这汇总分部加载的方案体现的很直观，很多游戏主流程包下载完毕就可以体验，然后再后台下载一些附加玩法的资源。

真实场景应用：
- 数据库连接池
- 身份认证 token 管理
- 配置加载系统
- 缓存预热策略

在初始化期间派发一些事件（比如当前加载资源的百分比），这样 UI 组件可以显示渐进式加载状态，而不是空白界面。


## 5.异步状态机模式（Async State Machine，复杂流程管理）
把复杂的异步操作看作状态机，而不是简单的线性流程。这种方法能让调试、测试和错误恢复更加高效。

### 线性流程混乱
```javaScript
async function syncUserData(userId) {
  const user = await fetchUser(userId);
  const updated = await updateUser(user);
  const synced = await syncToThirdParty(updated);
  return synced;
  // 无法清楚地知道错误发生在哪一步
}

```
### 状态机方法
```javaScript
class UserSyncStateMachine {
  constructor(userId) {
    this.userId = userId;
    this.state = 'idle';  // 当前状态
    this.data = null;
    this.error = null;
    this.events = [];  // 记录状态变化事件
  }
​
  async execute() {
    try {
      await this.transition('fetching');
      // 🎯 小技巧：每个状态转换都是显式的
      this.data = await fetchUser(this.userId);
​
      await this.transition('validating');
      if (!this.isValidUser(this.data)) {
        throw new Error('用户数据结构无效');
      }
​
      await this.transition('updating');
      // 🎯 小技巧：状态在异步操作中保持
      this.data = await updateUser(this.data);
​
      await this.transition('syncing');
      this.data = await syncToThirdParty(this.data);
​
      await this.transition('completed');
      return this.data;
    } catch (error) {
      await this.transition('error', error);
      throw error;
    }
  }
​
  async transition(newState, data = null) {
    const previousState = this.state;
    this.state = newState;
​
    // 🎯 小技巧：事件日志用于调试
    const event = {
      timestamp: Date.now(),
      from: previousState,
      to: newState,
      data: data || this.data,
      error: newState === 'error' ? data : null
    };
​
    this.events.push(event);
​
    if (newState === 'error') this.error = data;
​
    // 🎯 小技巧：开发环境可模拟延迟
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
​
    // 可用于外部监控
    this.emit('stateChange', event);
  }
​
  emit(event, data) {
    console.log(`UserSync[${this.userId}] ${event}:`, data);
  }
​
  getExecutionSummary() {
    return {
      userId: this.userId,
      finalState: this.state,
      totalTime: this.events.length > 0 ? 
        this.events[this.events.length - 1].timestamp - this.events[0].timestamp : 0,
      events: this.events,
      error: this.error
    };
  }
}
```
状态机模式提供了对异步流程的完整可视化。可以在任意状态暂停、注入错误进行测试，并精确追踪错误位置，使复杂异步操作可调试、可测试。
```javaScript
class AsyncStateMachine {
  constructor(states, initialState = 'idle') {
    this.states = states;
    this.currentState = initialState;
    this.context = {};  // 存储状态上下文
    this.history = [];
  }
​
  async execute(input) {
    while (this.currentState !== 'completed' && this.currentState !== 'error') {
      // 🎯 高级：动态状态转换逻辑
      const stateConfig = this.states[this.currentState];
      if (!stateConfig) throw new Error(`未知状态: ${this.currentState}`);
​
      try {
        const result = await stateConfig.action(this.context, input);
        const nextState = stateConfig.next(result, this.context);
        await this.transition(nextState, result);
      } catch (error) {
        const errorState = stateConfig.onError || 'error';
        await this.transition(errorState, error);
      }
    }
​
    return this.context;
  }
​
  async transition(newState, data) {
    const event = {
      timestamp: Date.now(),
      from: this.currentState,
      to: newState,
      data
    };
​
    this.history.push(event);
    this.currentState = newState;
​
    // 🎯 秘诀：在转换过程中更新上下文
    if (data && typeof data === 'object') Object.assign(this.context, data);
  }
}
​
// 用法示例
const userSyncStates = {
  idle: { action: async () => ({ ready: true }), next: () => 'fetching' },
  fetching: {
    action: async (context, input) => {
      const user = await fetchUser(input.userId);
      return { user };
    },
    next: (result) => result.user ? 'updating' : 'error',
    onError: 'error'
  },
  updating: {
    action: async (context) => {
      const updated = await updateUser(context.user);
      return { user: updated };
    },
    next: () => 'completed',
    onError: 'error'
  }
};
​
const machine = new AsyncStateMachine(userSyncStates);
const result = await machine.execute({ userId: 123 });
```
实际应用场景

- 支付流程管理（Payment processing workflows）
- 文件上传与校验步骤（File upload with validation steps）
- 多步骤表单提交（Multi-step form submissions）
- 数据迁移流程（Data migration processes）

专业提示：任何包含超过 3 步或有复杂错误恢复需求的异步流程，都建议使用状态机。即便只是调试上的收益，也非常值得。

## 6.实践策略
实践策略

- 先在现有代码中加入 错误边界（Error Boundaries） ，影响大且风险低。
- 对外部 API 调用添加 超时策略（Timeouts） ，能避免应用“卡死”。
- 队列模式（Async Queue） 在应用扩展时非常关键，应提前实现。
- 初始化模式（Async Initialization） 和 状态机模式（Async State - Machine） 用于最关键的异步流程——那些一旦出错就会让你彻夜难眠的逻辑。