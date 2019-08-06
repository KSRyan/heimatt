// 注册全局面包屑组件的插件
// 定义规则 暴露一个对象{} 在对象中选项 install 对应一个函数、形参为Vue
import myBread from '@/components/my-bread'
export default {
  install (Vue) {
  // Vue.use(插件名称)
    Vue.component(
      myBread.name, myBread
    )
  }
}
