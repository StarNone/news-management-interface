<template>
  <div class="contaier">
    <div class="box">
      <img src="../../assets/logo.png" alt="">
      <h3>注册</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="first-item">
        <span>账号：</span>
        <el-form-item
          prop="account">
          <el-input
            class="input"
            v-model="ruleForm.account"
            placeholder="请输入账号"></el-input>
        </el-form-item>
        <span>密码：</span>
        <el-form-item prop="password">
          <el-input
            class="input"
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <span>确认密码：</span>
        <el-form-item prop="secondPassword">
          <el-input
            class="input"
            type="password"
            v-model="ruleForm.secondPassword"
            placeholder="请再次输入密码"
            ></el-input>
        </el-form-item>
        <span>内部密钥：</span>
        <el-form-item prop="secondPassword">
          <el-input
            class="input"
            type="password"
            v-model="ruleForm.lock"
            placeholder="请输入密钥"
            ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn" type="primary" @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validateLock = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密钥不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.secondPassword !== '') {
          this.$refs.ruleForm.validateField('secondPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: '',
        secondPassword: '',
        lock: ''
      },
      rules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        secondPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        lock: [
          {validator: validateLock, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register () {
      const _this = this
      this.$axios.post(this.$api.Register, {
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        lock: this.ruleForm.lock
      }).then(res => {
        if (res.data.code === 200) {
          _this.$alert(res.data.msg, '信息提示', {
            callback: action => {
              this.$router.push({
                name: 'login'
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
    width: 520px;
    max-width: 100%;
    margin: 100px auto;
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

    .first-item {
    width: 300px;
    margin: 0px auto;

    span {
      color: #fff;
      font-size: 20px;
    }
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

    .btn {
      width: 100%;
    }
  }
}
</style>
