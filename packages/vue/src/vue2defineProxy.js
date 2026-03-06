// 模拟 Vue2 响应式核心逻辑
function defineReactive(obj, key, value) {
  // 递归处理嵌套对象（比如 obj = { a: { b: 1 } }）
  observe(value);

  // 拦截属性的读取和修改
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    // 读取属性时触发（收集依赖）
    get() {
      console.log(`读取 ${key}：${value}`);
      // 收集依赖（比如对应的 watcher/effect）
      dep.depend();
      return value;
    },
    // 修改属性时触发（触发更新）
    set(newVal) {
      if (newVal === value) return;
      console.log(`修改 ${key}：${newVal}`);
      value = newVal;
      // 递归处理新值（如果新值是对象）
      observe(newVal);
      // 通知依赖更新（比如重新渲染视图）
      dep.notify();
    }
  });
}

// 遍历对象，为所有属性添加响应式
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  // 遍历对象的每个 key
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

// 测试
const data = { price: 100, number: 2 };
observe(data);

// 读取属性 → 触发 get
console.log(data.price); // 输出：读取 price：100  100
// 修改属性 → 触发 set
data.number = 3; // 输出：修改 number：3