<template>
  <div class="comment-container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'允许':'禁止'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.comment_status" type="danger" size="small" @click="toggleStatus(scope.row)">关闭评论</el-button>
            <el-button v-else type="success" size="small" @click="toggleStatus(scope.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
       style="margin-top:20px"
       background
       v-if="total > reqParams.per_page"
       layout="prev, pager, next"
       :total="total"
       :page-size="reqParams.per_page"
       :current-page="reqParams.page"
       @current-change="changePage">

      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0,
      comments: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async toggleStatus (row) {
      const { data: { data } } = await this.$https.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const { data: { data } } = await this.$https.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>
