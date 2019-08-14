<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list" >
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
              <p style="font-size:12px">{{item.name}}</p>
              <el-button plain type="primary" size="mini">+关注</el-button>
            </div>
          </div>
          <el-pagination background
                     layout="prev, pager, next, total"
                     :total="total"
                     :page-size="reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="changePager"
                     >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝数据" name="photo">
          <div style="width:700px; height:500px; text-align:center" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      total: 0,
      fansList: [],
      activeName: 'list'
    }
  },
  methods: {
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFanslist()
    },
    async getFanslist () {
      const { data: { data } } = await this.$https.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getFanslist()
  },
  mounted () {
    // 操作dom
    const dom = this.$refs.dom
    const myCharts = echarts.init(dom)
    // echarts 配置数据  ---开始
    var data = [{
      name: 'Grandpa',
      children: [{
        name: 'Uncle Leo',
        value: 15,
        children: [{
          name: 'Cousin Jack',
          value: 2
        }, {
          name: 'Cousin Mary',
          value: 5,
          children: [{
            name: 'Jackson',
            value: 2
          }]
        }, {
          name: 'Cousin Ben',
          value: 4
        }]
      }, {
        name: 'Aunt Jane',
        children: [{
          name: 'Cousin Kate',
          value: 4
        }]
      }, {
        name: 'Father',
        value: 10,
        children: [{
          name: 'Me',
          value: 5,
          itemStyle: {
            color: 'red'
          }
        }, {
          name: 'Brother Peter',
          value: 1
        }]
      }]
    }, {
      name: 'Mike',
      children: [{
        name: 'Uncle Dan',
        children: [{
          name: 'Cousin Lucy',
          value: 3
        }, {
          name: 'Cousin Luck',
          value: 4,
          children: [{
            name: 'Nephew',
            value: 2
          }]
        }]
      }]
    }, {
      name: 'Nancy',
      children: [{
        name: 'Uncle Nike',
        children: [{
          name: 'Cousin Betty',
          value: 1
        }, {
          name: 'Cousin Jenny',
          value: 2
        }]
      }]
    }]
    const option = {
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
          color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
        }
      },
      series: {
        type: 'sunburst',
        data: data,
        radius: [0, '90%'],
        label: {
          rotate: 'radial'
        }
      }
    }
    // echarts 配置数据  ---结束
    myCharts.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.fans-item{
  text-align: center;
  width: 125px;
  height: 170px;
  border: 1px dashed #ddd;
  padding-top: 15px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
}
</style>
