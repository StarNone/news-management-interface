<template>
  <div>
    <hzsidenav />
    <hzhead />
    <transition name="fade"><router-view></router-view></transition>
  </div>
</template>

<script>
import hzsidenav from './components/side'
import hzhead from './components/head'
export default {
  name: 'index',
  components: {
    hzsidenav,
    hzhead
  },
  data () {
    return {
      pathmsg: []
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: all ease 1s;
}
.fade-enter {
  margin-left: 20px;
  margin-right: 0;
  opacity: 0;
}
.fade-leave {
  margin-left: 20px;
  margin-right: 0;
  opacity: 0;
}
</style>
