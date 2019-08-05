// 封装操作sessionStorage的函数 提供给其他模块使用
// 1约定好key的值
// 2约定好value的值 字符串形式的json数据

// 1
const KEY = 'user'
// 2
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
