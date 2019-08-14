<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
           <el-form label-width="120px">
              <el-form-item label="编号：">{{formDate.id}}</el-form-item>
              <el-form-item label="手机号：">{{formDate.mobile}}</el-form-item>
               <el-form-item label="媒体名称：">
                 <el-input v-model="formDate.name"></el-input>
               </el-form-item>
               <el-form-item label="媒体介绍：">
                 <el-input v-model="formDate.intro" type="textarea" :rows="3"></el-input>
               </el-form-item>
               <el-form-item label="邮箱：">
                 <el-input v-model="formDate.email"></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button type="primary" @click="updateUser">保存设置</el-button>
               </el-form-item>
           </el-form>
        </el-col>
        <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="myUpload"
              :show-file-list="false">
              <img v-if="formDate.photo" :src="formDate.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center; font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store/index.js'
import eventBus from '@/components/eventBus.js'

export default {
  data () {
    return {
      formDate: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  methods: {
    // 拉取后台用户信息
    async getuserInfo () {
      const { data: { data } } = await this.$https.get('user/profile')
      this.formDate = data
    },
    // 修改用户信息
    async updateUser () {
      await this.$https.patch('user/profile', {
        name: this.formDate.name,
        intro: this.formDate.intro,
        email: this.formDate.email
      })
      this.$message.success('保存修改成功')
      store.setUser({ name: this.formDate.name })
      eventBus.$emit('updateName', this.formDate.name)
    },
    async myUpload (result) {
      // console.log(result)

      // 使用FormData存储头像信息
      const fd = new FormData()
      fd.append('photo', result.file)
      // 发送异步请求，将FormData传入后台服务器
      const { data: { data } } = await this.$https.patch('user/photo', fd)
      // 提示信息
      this.$message.success('修改头像成功')
      // 预览头像
      this.formDate.photo = data.photo
      // 更新本地存储中的头像信息
      store.setUser({ photo: this.formDate.photo })
      // 更新home组件中的头像信息
      eventBus.$emit('updatePhoto', this.formDate.photo)
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style scoped lang="less">

</style>
