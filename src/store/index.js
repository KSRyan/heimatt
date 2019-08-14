// 封装操作sessionStorage的函数 提供给其他模块使用
// 1约定好key的值
// 2约定好value的值 字符串形式的json数据

// 1
const KEY = 'user'
// 2
export default {
  setUser (user) {
    // 获取本地的存储的对象，把传入的对象，合并覆盖到当前存储对象中。
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
