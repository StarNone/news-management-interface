<template>
  <div class="contaier">
    <div class="box">
      <img src="../../assets/logo.png" alt="">
      <h3>NEWS新闻发布网后台管理系统</h3>
      <div>
        <el-input
          class="input"
          v-model="account">
            <i slot="prefix" class="icon el-icon-user-solid"></i>
          </el-input>
      </div>
      <div>
        <el-input
          show-password
          class="input"
          v-model="password">
            <i slot="prefix" class="icon el-icon-lock"></i>
          </el-input>
      </div>
      <el-button class="btn" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      const _this = this
      this.$axios.post(this.$api.Login, {
        account: this.account,
        password: this.password
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          let token = res.data.token
          sessionStorage.setItem('token', token)
          _this.$message({
            message: '登陆成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push({
                name: 'index'
              })
            }
          })
        } else {
          _this.$alert(res.data.msg, '信息提示')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.contaier {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;

  .box {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    margin: 200px auto;
    background: rgba(200, 200, 200, .4);
    padding: 20px;
    border-radius: 10px;

    div {
      margin-top: 10px;
    }

    img {
      display: block;
      margin: 0 auto;
    }

    h3 {
      color: #fff;
      font-size: 30px;
      text-align: center;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    }
    .input /deep/ {
      .el-input__inner {
        width: 100%;
        background-color: rgba(0, 0, 0, .4) !important;
        border: none;
        height: 50px;
        color: #000;
        padding-left: 40px;
      }
    }

    .input {

      .icon {
        margin-top: 10px;
        font-size: 26px;
      }
    }

    .btn {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
