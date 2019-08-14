<template>
  <div class="article-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>{{articleId?'编辑':'发表'}}文章</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
         <!-- 自定义图片组件 -->
         <div v-if="articleForm.cover.type === 1">
          <my-image v-model="articleForm.cover.images[0]"></my-image>
         </div>
         <div v-if="articleForm.cover.type === 3">
          <my-image v-model="articleForm.cover.images[0]"></my-image>
          <my-image v-model="articleForm.cover.images[1]"></my-image>
          <my-image v-model="articleForm.cover.images[2]"></my-image>
         </div>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 自定义频道组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="danger" @click="update(false)">确定修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文本数据
      articleForm: {
        title: null,
        content: null,
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本数据
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 文章Id
      articleId: null,
      changePath: null
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.$confirm('确定放弃修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.articleId = null
          this.articleForm = {
            title: null,
            content: null,
            channel_id: null,
            cover: {
              type: 1,
              images: []
            }
          }
        }).catch(() => {})
      }
    }
  },
  created () {
    // 组件初始化前获取文章id,便于数据渲染
    this.articleId = this.$route.query.id
    // 如果有文章id, 代表是编辑文章，就获取当前id的文章
    if (this.articleId) this.getarticles()
    // console.log(this.$route)
  },
  methods: {
    async getarticles () {
      // 第一个参数是请求地址，第二个参数是{params ：参数}
      const { data: { data } } = await this.$https.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 切换选项卡时，数据重置为空
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表或存入草稿
    async submit (draft) {
      // 1.发请求
      await this.$https.post(`articles?draft=${draft}`, this.articleForm)
      // 2.提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 3.页面跳转到内容管理
      this.$router.push('/content')
    },
    // 修改或存入草稿
    async update (draft) {
      await this.$https.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '添加草稿成功' : '修改成功')
      this.$router.push('/content')
    }
  }
}
</script>

<style scoped lang="less">
</style>
