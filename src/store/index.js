import { createPinia } from 'pinia'
// import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

const store = createPinia()

export default store

// 模块统一导出
export * from './bpmn'
