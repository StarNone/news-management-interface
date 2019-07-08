<template>
  <div class="container">
    <h1 class="top-title">评论内容</h1>
    <div class="back">
      <el-button icon="el-icon-arrow-left" @click="$router.back()">返回</el-button>
    </div>
    <div class="msg">
      <el-table
        :data="message"
        stripe
        style="width: 100%">
        <el-table-column
          prop="content"
          label="发布内容"
          min-width="150">
          <template slot-scope="scope">
            <div class="content">
              <div v-html="scope.row.content"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user.nikename"
          label="作者"
          min-width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
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
  name: 'comment',
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
    getComment () {
      const _this = this
      this.$axios.get(this.$api.getCommentByUser + this.$route.params.id).then(res => {
        _this.tableData = res.data
        _this.initMessage()
        _this.inittotalpage()
      })
    },
    handleDelete (id) {
      const _this = this
      this.$axios.delete(this.$api.deleteComment + id).then(res => {
        console.log(res)
        if (res.code === 200) {
          _this.$alert(res.msg, '信息提示')
          _this.getComment()
        }
        _this.$alert(res.msg, '信息提示')
      })
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped>
.top-title {
  color: #888;
}
.back {
  margin-top: 4px;
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
