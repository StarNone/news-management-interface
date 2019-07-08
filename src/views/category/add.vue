<template>
  <div class="container">
    <h1 class="top-title">分类添加</h1>
    <div class="title">
      <span>分类名称：</span>
      <el-input v-model="name"></el-input>
    </div>
    <el-button class="btn" type="primary" @click="handleSend">发送</el-button>
  </div>
</template>

<script>
export default {
  name: 'chartadd',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    handleSend () {
      const _this = this
      this.$axios.post(this.$api.addCategory, {
        name: this.name
      }).then(res => {
        _this.$alert(res.msg, '信息提示')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {

  .top-title {
    color: #888;
  }

  div {
    margin-top: 10px;
  }

  span {
    display: block;
    margin: 10px 0;
    color: #999;
  }

  .btn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
