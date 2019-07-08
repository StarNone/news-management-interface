<template>
  <div>
          <textarea :id="id" :value="value"></textarea>
  </div>
</template>

<script>
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/emoticons'
const INIT = 0
const CHANGED = 2
export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      editor: null,
      required: true
    },
    setting: {},
    url: {
      default: '',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    },
    menuboolen: Boolean,
    toolbar1: String
  },
  watch: {
    value: function (val) {
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val)
      }
      this.status = CHANGED
    }
  },
  data () {
    return {
      token: '',
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  mounted () {
    const _this = this
    this.$axios.get(this.$api.getUploadToken).then(res => {
      _this.token = res.token
    })
    const setting = {
      selector: '#' + _this.id,
      // upload_image_url: '/upload/cloud',
      language: 'zh_CN',
      language_url: '../../../static/js/zh_CN.js',
      emoticons_database_url: '../../../static/js/emojis.js',
      init_instance_callback: function (editor) {
        console.log('Editor: ' + editor.id + ' is now initialized.')
        editor.on('input change undo redo', () => {
          var content = editor.getContent()
          _this.$emit('show', content)
        })
      },
      content_style: `
        *                         { padding:0; margin:0; }
        html,body                 { height:100%; }
        img                       { max-width:100%; display:block;height:auto; }
        a                         { text-decoration: none; }
        iframe                    { width: 100%; }
        p                         { line-height:1.6; margin: 0px; }
        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
        ul,ol                     { list-style-position:inside; }
      `,
      insert_button_items: 'image link | inserttable',
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]', // word需要它
      paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false, // 插入word文档需要该属性
      paste_webkit_styles: 'all',
      paste_merge_formats: true,
      nonbreaking_force_tab: false,
      paste_auto_cleanup_on_paste: false,
      'plugins': [
        'advlist link image',
        'code',
        'emoticons',
        'table textcolor paste textcolor colorpicker'
      ], // 配置
      'toolbar_items_size': 'small',
      'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
      'menubar': this.menuboolen,
      // 'toolbar1': 'table |insertfile undo redo | formatselect | link unlink | uploadimg image media', // 工具栏1
      // 'toolbar2': 'emoticons | fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
      'toolbar1': this.toolbar1,
      // 图片上传
      images_upload_handler: function (blobInfo, success, failure) {
        if (blobInfo.blob().size > self.maxSize) {
          failure('文件体积过大')
        }
        if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
          uploadPic()
        } else {
          failure('图片格式错误')
        }
        function uploadPic () {
          let formData = new FormData()
          // 服务端接收文件的参数名，文件数据，文件名
          formData.append('upfile', blobInfo.blob(), blobInfo.filename())
          formData.append('token', _this.token)
          axios.post(
            // 这里是你的上传地址
            'https://upload-z1.qiniup.com',
            formData
          )
            .then((res) => {
              // 这里返回的是你图片的地址
              success(res.data.url)
            })
            .catch(() => {
              failure('上传失败')
            })
        }
      }
    }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>

<style scoped>

</style>
