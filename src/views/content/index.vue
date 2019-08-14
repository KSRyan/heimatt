<template>
 <div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <my-bread>内容管理</my-bread>
    </div>

    <el-form label-width="80px" size='small'>

      <el-form-item label="状态：">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道：">
        <!-- clearable 清空数据后，channel_id变为''。应该监听它的变换，当为''时应该变为null -->
        <!-- 自定义频道组件 -->
        <my-channel v-model="reqParams.channel_id"></my-channel>
      </el-form-item>

      <el-form-item label="日期：">
        <el-date-picker
           @change="changeDate"
           value-format='yyyy-MM-dd'
           v-model="dataArr"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search()">筛选</el-button>
      </el-form-item>

    </el-form>
  </el-card>

  <el-card>
    <div slot="header">根据筛选条件共查询到{{total}}条结果</div>
    <el-table :data="articles">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <!--  scope.row = articles = data.results  -->
          <el-image :src="scope.row.cover.images[0]"
                    style="width:80px; height:80px;">
            <div slot="error" class="image-slot">
              <img src="../../assets/images/error.gif"
                   style="width:80px; height:80px;">
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status == 0">草稿</el-tag>
          <el-tag v-if="scope.row.status == 1">待审核</el-tag>
          <el-tag type="success" v-if="scope.row.status == 2">审核通过</el-tag>
          <el-tag type="warning" v-if="scope.row.status == 3">审核失败</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 4">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="pubdate"></el-table-column>
      <el-table-column label="操作" width="120">
         <template slot-scope="scope">
           <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle plain></el-button>
           <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle plain></el-button>
         </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:30px;">
      <el-pagination background
                     layout="prev, pager, next, total"
                     :total="total"
                     :page-size="reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="changePager"
                     >
                     </el-pagination>
    </div>
  </el-card>
 </div>
</template>

<script>

export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      //  日期
      dataArr: [],
      // 文章列表数据
      articles: [],
      // 文章总条数
      total: 0
    }
  },

  created () {
    this.getarticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$https.delete(`articles/${id}`)
        this.$message.success('删除成功！')
        this.getarticles()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 监听日期改变
    changeDate (dataArr) {
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      this.getarticles()
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getarticles()
    },

    async getarticles () {
      // 第一个参数是请求地址，第二个参数是{params ：参数}
      const { data: { data } } = await this.$https.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style>
  .el-card{
    margin-top: 20px;
  }
</style>
