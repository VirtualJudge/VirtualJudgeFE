<template>
  <div style="margin: 0px 0px 15px 0px">
    <Row type="flex" justify="space-between" class="header">
      <Col :span=12>
        <div>
          <span>语言:</span>
          <Select :value="language" @on-change="onLangChange" class="adjust">
            <Option v-for="item in languages" :key="item.oj_language" :value="item.oj_language">
              {{item.oj_language_name}}
            </Option>
          </Select>

          <Tooltip content="Reset to default code definition" placement="top" style="margin-left: 10px">
            <Button @click="onResetClick">
              <Icon type="md-refresh"/>
            </Button>
          </Tooltip>
        </div>
      </Col>
      <Col :span=12>
        <div class="fl-right">
          <span>主题:</span>
          <Select :value="theme" @on-change="onThemeChange" class="adjust">
            <Option v-for="item in themes" :key="item.label" :value="item.value">{{item.label}}
            </Option>
          </Select>
        </div>
      </Col>
    </Row>
    <codemirror :value="value" @change="onEditorCodeChange" :options="options" ref="myEditor">
    </codemirror>
  </div>
</template>

<script>
  import {codemirror} from 'vue-codemirror-lite'
  // theme
  import 'codemirror/theme/monokai.css'
  import 'codemirror/theme/solarized.css'
  import 'codemirror/theme/material.css'
  // mode
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/python/python.js'
  // active-line.js
  import 'codemirror/addon/selection/active-line.js'
  // foldGutter
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/indent-fold.js'

  export default {
    name: "CodeMirror",
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      languages: {
        type: Array,
        default: () => {
          return []
        }
      },
      language: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'solarized'
      }
    },
    data() {
      return {
        options: {
          // codemirror options
          tabSize: 4,
          theme: 'solarized',
          lineNumbers: true,
          line: true,
          // 代码折叠
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          // 选中文本自动高亮，及高亮方式
          styleSelectedText: true,
          smartIndent: false,
          lineWrapping: false,
        },
        themes: [
          {label: 'Monokai', value: 'monokai'},
          {label: 'Solarized Light', value: 'solarized'},
          {label: 'Material', value: 'material'}
        ]
      }
    },
    methods: {
      onEditorCodeChange(newCode) {
        this.$emit('update:value', newCode)
      },
      onLangChange (newVal) {
        this.$emit('changeLang', newVal)
      },
      onThemeChange(newTheme) {
        this.editor.setOption('theme', newTheme)
        this.$emit('changeTheme', newTheme)
      },
      onResetClick() {
        this.$emit('resetCode')
      }
    },
    computed: {
      editor() {
        // get current editor object
        return this.$refs.myEditor.editor
      }
    },
    watch: {
      'theme'(newVal, oldVal) {
        this.editor.setOption('theme', newVal)
      }
    }
  }
</script>

<style scoped>
  .header {
    margin: 5px 5px 15px 5px;
  }

  .adjust {
    width: 150px;
    margin-left: 10px;
  }

  .fl-right {
    float: right;
  }

</style>
<style>
  .CodeMirror {
    height: auto !important;
  }

  .CodeMirror-scroll {
    min-height: 300px;
    max-height: 1000px;
  }
</style>
