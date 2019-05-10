<template>
  <div class="h">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="left">
      <el-breadcrumb-item class="left-item" :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <transition name="fade"><el-breadcrumb-item v-if="pathmsg[0]">{{pathmsg[0]}}</el-breadcrumb-item></transition>
      <transition name="fade"><el-breadcrumb-item v-if="pathmsg[0]">{{pathmsg[1]}}</el-breadcrumb-item></transition>
    </el-breadcrumb>
    <h1 class="title">NEWS新闻发布网后台管理系统</h1>
    <div class="right-msg">
      <img src="" alt="" class="avatar">
      <el-dropdown class="user-msg">
        <span class="el-dropdown-link username">
          hhhhh<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link :to="{name: 'index'}">返回首页</router-link></el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
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
  watch: {
    '$route' (val, old) {
      if (val.path === '/index') {
        this.$store.dispatch('getPathMsg', [])
      }
    }
  },
  computed: {
    pathmsg () {
      return this.$store.state.pathmsg
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
      background: #f00;
      border-radius: 6px;
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
