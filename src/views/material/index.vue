<template>
  <div>
    <el-card>
      <div slot="header">
         <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small" @change="collectIslove">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <div class="img-list">
          <div class="img-item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
            <div class="footer" v-show="!reqParams.collect">
              <span @click="toggle(item)" class="el-icon-star-off" :class="{selected: item.is_collected}"></span>
              <span @click="deleteImg(item.id)" class="el-icon-delete"></span>
            </div>
          </div>
      </div>
      <el-pagination
          v-if="total > reqParams.per_page"
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePage"
          >
      </el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    handleSuccess (res) {
      console.log(res)
      // 获取上传成功的图片地址  res.data.url
      // 1. 预览
      this.imageUrl = res.data.url
      // 2. 提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 3. 5s 关闭对话框
        // 4. 5s 更新列表
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 5000)
    },
    // 删除素材
    deleteImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$https.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
        this.$message.success('取消成功')
      })
    },
    // 添加是否收藏
    async toggle (item) {
      const { data: { data } } = await this.$https.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    // 分页功能
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const { data: { data } } = await this.$https.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换全部和收藏
    collectIslove () {
      this.reqParams.page = 1
      this.getImages()
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang='less'>
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    width: 100%;
    span {
      margin: 0 20px;
      &.selected {
        color: red;
      }
    }
  }
}
</style>
