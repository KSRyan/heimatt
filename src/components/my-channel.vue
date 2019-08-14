<template>
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 频道下拉选项数据
      channelOptions: []
    }
  },
  // watch: {
  //   'myValue': function (newValue, oldValue) {
  //     if (newValue === '') {
  //       this.myValue = null
  //     }
  //   }
  // },
  created () {
    this.getchannelOptions()
  },
  methods: {
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    },
    // 在组件渲染之前获取后台的数据赋值给channelOptions，便于视图渲染
    async getchannelOptions () {
      const { data: { data } } = await this.$https.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>

</style>
