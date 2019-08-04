<template>
  <el-container class="wraper">
   <el-aside :width="isColleges?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{miniLogo : isColleges}">
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :collapse="isColleges"
        :collapse-transition="false"
        default-active="1"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color='#002033'>

        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-edit"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
    </el-menu>

   </el-aside>
   <el-container>
    <el-header>
      <span class="el-icon-s-fold" @click="toggleMenu"></span>
      <span class="text">江苏传智播客教育科技有限公司</span>
      <!-- 下拉菜单 -->
      <el-dropdown class="my-drop">
        <span class="el-dropdown-link">
          <img src="../../assets/images/avatar.jpg"/>
          24K纯帅<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
          <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
   </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isColleges: false
    }
  },
  methods: {
    toggleMenu () {
      this.isColleges = !this.isColleges
    }
  }
}
</script>

<style scoped lang='less'>
  .wraper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .el-aside{
      background-color: #002033;
    }
    .el-header{
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      .el-icon-s-fold{
        cursor: pointer;
        font-size: 24px;
        vertical-align: middle;
      }
      .text{
        vertical-align: middle;
        margin-left: 15px;
      }
      .my-drop{
        float: right;
        font-weight: 700;
        img{
          width: 30px;
          vertical-align: middle;
        }
      }
    }
  }
  .logo{
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 130px auto;
  }
  .miniLogo{
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-menu{
    border-right: none;
  }
</style>
