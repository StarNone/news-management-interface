<template>
  <div class="container">
    <h1 class="top-title">用户管理</h1>
    <div class="msg">
      <el-table
        :data="message"
        stripe
        style="width: 100%">
        <el-table-column
          label="头像"
          min-width="120">
          <template slot-scope="scope">
            <div>
              <img class="avatar" :src="scope.row.avatar" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nikename"
          label="昵称"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="限制截止日期"
          prop="limitTime"
          min-width="120">
          <template slot-scope="scope">
            <div>
              <el-date-picker
                v-model="scope.row.limitTime"
                type="date"
                v-if="scope.row.limitTime !== '永久禁用'"
                placeholder="选择日期"></el-date-picker>
              <el-button v-if="scope.row.limitTime === '永久禁用'"
                type="text"
                disabled
                size="large">{{scope.row.limitTime}}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="164">
          <template slot-scope="scope">
            <div class="btns">
              <el-button type="info" size="small" @click="handleLook(scope.row._id)">查看评论</el-button>
              <el-button type="danger" size="small" @click="handleLimit(scope.row._id, scope.row.limitTime)">限制</el-button>
              <el-button type="danger" size="small" @click="handleLimit(scope.row._id, '永久禁用')">永久封禁</el-button>
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
    getUserData () {
      const _this = this
      this.$axios.get(this.$api.getAllUser).then(res => {
        console.log(res)
        _this.tableData = res.data
        _this.initMessage()
        _this.inittotalpage()
      })
    },
    handleLimit (id, limit) {
      console.log(id)
      console.log(limit)
      this.$axios.put(this.$api.manageUser, {
        id,
        limitTime: limit
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg, '信息提示')
        }
      })
    },
    handleLook (id) {
      this.$router.push({
        name: 'comment',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.getUserData()
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
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin: 0 auto;
}
</style>
