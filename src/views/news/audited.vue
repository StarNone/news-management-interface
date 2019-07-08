<template>
  <div class="container">
    <h1 class="top-title">审核通过新闻</h1>
    <div class="msg">
      <el-table
        :data="message"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="新闻标题"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="author.nikename"
          label="作者"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="info" @click="handleLook(scope.row._id)" size="small">查看详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagemenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[8]"
      :current-page="currentPage"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpages">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'chartdelete',
  data () {
    return {
      tableData: [],
      message: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 8
    }
  },
  methods: {
    initMessage () {
      this.message = this.tableData.slice(0, this.pagesize)
    },
    inittotalpage () {
      this.totalpages = Math.round(this.tableData.length)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initMessage()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.message = this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    getNews () {
      const _this = this
      this.$axios.get(this.$api.getNews, {
        params: {
          status: 1
        }
      }).then(res => {
        res.data.map(item => {
          item.createTime = moment(item.createTime).format('YYYY年M月D日')
          switch (item.status) {
            case 1:
              item.status = '审核通过'
              break
            case 2:
              item.status = '审核未通过'
              break
            default:
              item.status = '待审核'
              break
          }
        })
        _this.tableData = res.data
        _this.initMessage()
        _this.inittotalpage()
      })
    },
    handleLook (id) {
      console.log(id)
      this.$router.push({
        name: 'detail',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.getNews()
  }
}
</script>

<style scoped>
.top-title {
  color: #888;
}
.btns {
  text-align: center;
}
.pagemenu {
  position: absolute;
  top: 600px;
  right: 20px;
}
</style>
