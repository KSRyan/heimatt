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
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期：">
        <el-date-picker
           v-model="dataArr"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>

    </el-form>
  </el-card>

  <el-card>
    <div slot="header">根据筛选条件共查询到999条结果</div>
    <el-table :data="articles">
      <el-table-column prop="id" label="编号"></el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:30px;">
      <el-pagination background layout="prev, pager, next, total" :total="1000"></el-pagination>
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
        end_pubdate: null
      },
      // 频道下拉选项数据
      channelOptions: [
        { label: 'web前端', value: '101' },
        { label: 'php后台', value: '102' },
        { label: 'java后台', value: '103' },
        { label: '大数据', value: '104' }
      ],
      //  日期
      dataArr: []
      // articles: [{ id: 101 }, { id: 102 }]
    }
  }
}
</script>

<style>
  .el-card{
    margin-top: 20px;
  }
</style>
