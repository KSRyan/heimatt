<template>
  <div class="container">
    <el-card class="my-card">
      <!-- logo -->
      <img src="../../assets/images/logo_index.png" />
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:288px; margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入数据存储模块
import store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('格式不对'))
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log('success')
          this.$https.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(result => {
              console.log(result.data)
              // 本地存储用户信息
              store.setUser(result.data.data)
              this.$router.push('/')
            }).catch(() => {
              this.$message({
                showClose: true,
                message: '手机号或验证码错误',
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  //center - background-position
  //cover - background-size
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    position: absolute;
    width: 450px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
