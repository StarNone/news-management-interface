<template>
  <div class="container">
    <h1 class="top-title">轮播图删除</h1>
    <div class="msg">
      <el-table
        :data="message"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="primary" @click="handleLook(scope.row._id)" size="small">查看</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row._id)">删除</el-button>
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
export default {
  name: 'chartdelete',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
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
    getSwiper () {
      const _this = this
      this.$axios.get(this.$api.getSwiper).then(res => {
        console.log(res)
        _this.tableData = res.data
        _this.initMessage()
        _this.inittotalpage()
      })
    },
    handleLook (id) {
      console.log(id)
      this.$router.push({
        name: 'details',
        params: {
          id: id
        }
      })
    },
    handleDelete (id) {
      const _this = this
      this.$axios.delete(this.$api.deleteSwiper + id).then(res => {
        console.log(res)
        if (res.code === 200) {
          _this.$alert(res.msg, '信息提示')
          _this.getSwiper()
        }
        _this.$alert(res.msg, '信息提示')
      })
    }
  },
  mounted () {
    this.getSwiper()
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
