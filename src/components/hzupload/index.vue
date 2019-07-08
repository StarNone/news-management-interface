<template>
  <label class="hzupload">
    <input type="file" class="hz-upload-input" @change="change">
    <slot></slot>
  </label>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hzupload',
  data () {
    return {
      token: ''
    }
  },
  methods: {
    getToken () {
      let _this = this
      this.$axios.get(this.$api.getUploadToken).then(res => {
        _this.token = res.token
      })
    },
    change ($event) {
      const file = $event.target.files[0]
      console.log(file)
      const form = new FormData()
      form.append('file', file)
      form.append('token', this.token)
      axios.post('https://upload-z1.qiniup.com', form).then(res => {
        this.$emit('success', res.data.url)
      })
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style lang="scss">
  .hzupload {
    display: block;
    .hz-upload-input {
      display: none;
    }
  }
</style>
