<template>
  <div class="container">
    <h1 class="top-title">轮播图添加</h1>
    <div class="image">
      <span>轮播图图片：</span>
      <hz-upload
        class="avatar-uploader"
        @success="changeImageUrl">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus icon"></i>
      </hz-upload>
    </div>
    <div class="title">
      <span>标题：</span>
      <el-input v-model="title"></el-input>
    </div>
    <div class="author">
      <span>作者：</span>
      <el-input v-model="author"></el-input>
    </div>
    <div class="content">
      <span>内容：</span>
      <editor
        class="editor"
        :value="content"
        :setting="editorSetting"
        @show="editors"
        :url="url"
        :max-size="MaxSize"
        :accept="Accept"
        :with-credentials="withCredentials"
        :menuboolen="menuboolen"
        :toolbar1="toolbar"
        @on-upload-fail="onEditorReady"
        @on-upload-success="onEditorUploadComplete" />
    </div>
    <el-button class="btn" type="primary" @click="handleSend">发送</el-button>
  </div>
</template>

<script>
import editor from '@/components/editor'
import hzUpload from '@/components/hzupload'
export default {
  name: 'chartadd',
  components: {
    editor,
    hzUpload
  },
  data () {
    return {
      imageUrl: '',
      title: '',
      author: '',
      editorSetting: {
        height: 600
      },
      url: '',
      MaxSize: 75765, // 文件大小
      Accept: 'image/jpeg, image/png', // 文件格式
      withCredentials: true,
      menuboolen: true,
      toolbar: 'fontselect bold italic underline strikethrough | link unlink',
      content: '' // 富文本编辑器双向绑定的内容
    }
  },
  methods: {
    changeImageUrl (url) {
      url = url.replace('https', 'http')
      this.imageUrl = url
    },
    beforeAvatarUpload (file) {
    },
    editors (content) { // editor 组件传过来的值赋给content
      console.log(content)
      this.content = content
    },
    onEditorReady (ins, ina) { // 上传失败的函数
      console.log('ins', ins)
      console.log(ina)
    },
    onEditorUploadComplete (json) { // 处理上传图片后返回数据，添加img标签到编辑框内
      console.log('json', json)
      console.log(json[0].data.filePath)
      this.content = this.content + '<img src=' + json[0].data.filePath + '/>'
    },
    handleSend () {
      const _this = this
      this.$axios.post(this.$api.addSwiper, {
        img: this.imageUrl,
        title: this.title,
        author: this.author,
        content: this.content
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

  .image {

    .avatar-uploader {
      width: 300px;
      height: 200px;
      border: 1px dashed #d9d9d9;

      img {
        width: 100%;
        height: 100%;
      }

      .icon {
        font-size: 28px;
        color: #8c939d;
        width: 300px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }

    .avatar-uploader:hover {
      border: 1px dashed #409eff;
      cursor: pointer;
    }
  }
}
</style>
