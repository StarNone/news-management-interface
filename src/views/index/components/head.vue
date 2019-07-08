<template>
  <div class="h">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="left">
      <el-breadcrumb-item class="left-item" :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <transition name="fade"><el-breadcrumb-item v-if="pathmsg[0]">{{pathmsg[0]}}</el-breadcrumb-item></transition>
      <transition name="fade"><el-breadcrumb-item v-if="pathmsg[0]">{{pathmsg[1]}}</el-breadcrumb-item></transition>
    </el-breadcrumb>
    <h1 class="title">NEWS新闻发布网后台管理系统</h1>
    <div class="right-msg">
      <img :src="adminmsg.avatar" alt="" class="avatar">
      <el-dropdown class="user-msg" @command="handleCommand">
        <span class="el-dropdown-link username">
          {{adminmsg.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="index">返回首页</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head',
  data () {
    return {
    }
  },
  methods: {
    getAdminData () {
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('getAdminMsg')
      }
    },
    handleCommand (command) {
      if (command === 'logout') {
        sessionStorage.removeItem('token')
        this.$store.commit('CHANGE_ADMIN_MSG', {})
        this.$message({
          message: '注销成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.$router.push({
              name: 'login'
            })
          }
        })
      }
      if (command === 'index') {
        this.$router.push({
          name: 'index'
        })
      }
    }
  },
  watch: {
    '$route' (val, old) {
      if (val.path === '/index') {
        this.$store.dispatch('getPathMsg', [])
      }
    }
  },
  created () {
    this.getAdminData()
  },
  computed: {
    pathmsg () {
      return this.$store.state.pathmsg
    },
    adminmsg () {
      return this.$store.state.adminMsg
    }
  }
}
</script>

<style scoped lang="scss">
.h {
  margin-left: 220px;
  padding: 20px;
  height: 20px;
  border-bottom: 1px solid #555;
  background: #eee;

  .left {
    float: left;
  }

  .title {
    position: absolute;
    left: 50%;
  }

  .right-msg {
    float: right;
    margin-top: -12px;

    .avatar {
      float: left;
      height: 40px;
      width: 40px;
      border-radius: 20px;
    }

    .user-msg {
      margin-left: 8px;
      height: 40px;
      line-height: 40px;

      .username {
        cursor: pointer;
      }
    }
  }

  .fade-enter-active {
    transition: all ease 1s;
  }
  .fade-enter {
    margin-left: 10px;
    opacity: 0;
  }
  .fade-leave {
    margin-left: 10px;
    opacity: 0;
  }
}
</style>
