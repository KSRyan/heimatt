<template>
 <div class="my-img">
   <!-- 图片按钮 -->
   <div class="img-btn" @click="openDialog()">
     <img :src="value||defaultImage">
   </div>
   <!-- 对话框 -->
   <el-dialog :visible.sync="dialogVisible" width="650px">
     <el-tabs v-model="activeName" type="card">
       <el-tab-pane label="素材库" name="image">
         <!-- tab 切换 -->
          <el-radio-group v-model="reqParams.collect" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
        <!-- 图片列表 -->
          <div class="img-list">
            <div class="img-item" v-for="item in images" :key="item.id"
                 :class="{selected:selectImageUrl === item.url}"
                 @click="selectImageUrl = item.url">
                 <!-- @click="selectImageUrl=null?selectImageUrl = item.url:selectImageUrl=null" -->
              <img :src="item.url">
            </div>
          </div>
        <!-- 分页 -->
          <el-pagination
            v-if="total > reqParams.per_page"
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
            >
          </el-pagination>
       </el-tab-pane>

       <el-tab-pane label="上传图片" name="upload">
         <el-upload
           class="avatar-uploader"
           action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
           :headers="headers"
           :show-file-list="false"
           :on-success="handleSuccess"
           name="image">

           <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
       </el-tab-pane>
     </el-tabs>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="confirmImage">确 定</el-button>
     </span>
   </el-dialog>
 </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表
      images: [],
      // 图片总数
      total: 0,
      selectImageUrl: null,

      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null,
      defaultImage
    }
  },
  methods: {
    // 确定提交图片
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectImageUrl
        this.$emit('input', this.selectImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传图片
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 打开对话框
    openDialog () {
      // 清空上一次选择和上传的图片
      this.selectImageUrl = null
      this.uploadImageUrl = null
      this.dialogVisible = true
      // 打开对话框时获取数据
      this.getImages()
    },
    // 获取图片列表
    async getImages () {
      const { data: { data } } = await this.$https.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
 .my-img{
   display: inline-block;
   margin-right: 15px;
 }
 .img-btn{
    margin-top: 10px;
    width: 160px;
    height: 160px;
    border: 1px dashed cyan;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
 .dialog-footer{
   display: block;
   width:100%;
   text-align: center;
}
.img-list {
    margin-top:15px;
   .img-item{
     display: inline-block;
     position: relative;
     width: 140px;
     height: 120px;
     margin-right: 10px;
     margin-bottom: 15px;
     border: 1px dashed cyan;
     &.selected{
       &::after{
       content: '';
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       background: rgba(0,0,0, .3) url(../assets/images/selected.png) no-repeat center / 50px 50px
       }
     }
     img{
       display: block;
       width: 100%;
       height: 100%;
       object-fit: contain;
     }
 }
}

</style>
