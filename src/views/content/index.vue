<template>
  <div>内容</div>
</template>

<script>
export default {
  methods: {
    login () {
      // console.log('success')
      this.$https.get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
        .then(result => {
          console.log(result.data)
          // 本地存储用户信息
        })
    }
  },
  created () {
    this.login()
  }
}
</script>

<style>

</style>
