// 注册全局面包屑组件的插件
// 定义规则 暴露一个对象{} 在对象中选项 install 对应一个函数、形参为Vue
import myBread from '@/components/my-bread'
import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
