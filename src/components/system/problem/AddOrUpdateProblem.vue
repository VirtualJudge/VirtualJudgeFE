<template>
  <div>
    <div>
      <h2 v-if="problem_id" style="text-align: center">更新题目</h2>
      <h2 v-else style="text-align: center">添加题目</h2>
      <Divider/>
      <h3 style="text-align: center;margin-bottom: 10px">基础信息</h3>
      <div style="width: 500px;margin: auto">
        <Form :label-width="120">
          <FormItem label="标题">
            <label>
              <Input type="text" v-model="formData.title"/>
            </label>
          </FormItem>
          <FormItem label="时间限制(ms)">
            <label>
              <Input type="number" placeholder="单位:ms" v-model="formData.time_limit"/>
            </label>
          </FormItem>
          <FormItem label="内存限制(MiB)">
            <label>
              <Input type="number" placeholder="单位:MiB" v-model="formData.memory_limit"/>
            </label>
          </FormItem>
          <FormItem label="来源">
            <label>
              <Input type="text" v-model="formData.source"/>
            </label>
          </FormItem>
          <FormItem label="权限">
            <label>
              <Select placement="top" v-model="formData.is_public">
                <Option v-for="(item, i) in source_choice" :key="i" :value="i">{{ item.name }}</Option>
              </Select>
            </label>
          </FormItem>
        </Form>
      </div>
      <Divider/>
      <h3 style="text-align: center;margin-bottom: 10px">题目内容</h3>
      <Tabs type="card" value="Markdown" @on-tab-remove="handleTabRemove">
        <TabPane label="Markdown" name="Markdown">
          <mavon-editor
              ref=md
              @imgAdd="imageAdd"
              @save="onMavonSave"
              @imgDel="imageDel"
              v-model="formData.editor_text.markdown"
              v-bind:boxShadow="false"
              v-bind:tabSize="4"
              :externalLink="externalLink"
              :toolbars="editor_toolbar"
              codeStyle="atom-one-light"/>
        </TabPane>
        <TabPane label="PDF" name="PDF">

          <Upload
              style="max-width: 1000px;margin: auto"
              ref="pdfUpload"
              :on-success="onPDFSuccess"
              :on-error="onError"
              :on-format-error="onPDFFormatError"
              :on-exceeded-size="onExceededSize"
              :on-preview="onPDFReview"
              :on-remove="onPDFRemove"
              :before-upload="beforePDFUpload"
              :default-file-list="pdfFileList"
              :with-credentials="true"
              :format="uploadConfig.pdf_format"
              accept="application/pdf"
              :max-size="10240"
              type="drag"
              :headers="uploadHeaders"
              :show-upload-list="true"
              action="/api/problem/pdf">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击这里选择PDF，或者直接将PDF拖放到这里</p>
            </div>
          </Upload>
        </TabPane>
        <TabPane label="Legacy" name="Legacy" closable v-if="formData.editor_text.legacy"></TabPane>
      </Tabs>

      <Divider/>
      <h3 style="text-align: center">上传测试数据</h3>
      <div style="max-width: 1000px;margin: auto">
        <Upload
            style="margin-top: 10px"
            :on-success="onSuccess"
            :on-error="onError"
            :on-format-error="onZIPFormatError"
            :on-exceeded-size="onExceededSize"
            :with-credentials="true"
            :format="uploadConfig.zip_format"
            accept="application/x-zip-compressed"
            :max-size="10240"
            type="drag"
            :headers="uploadHeaders"
            :data="formData.manifest"
            :show-upload-list="false"
            action="/api/problem/upload_test_cases/">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>选择或者拖拽zip测试样例文件</p>
          </div>
        </Upload>
        <Card style="margin-top: 10px" dis-hover v-if="formData.manifest.test_cases.length > 0">
          <p slot="title"><b>{{ formData.manifest.hash }}</b></p>
          <Table
              style="margin-top: 10px"
              :columns="test_cases_col"
              :data="formData.manifest.test_cases">
          </Table>
        </Card>
      </div>
      <Divider/>
      <h3 style="text-align: center">上传SPJ代码</h3>
      <div style="max-width: 1000px;margin: auto">
        <Form :label-width="120">
          <FormItem>
            <p slot="label">SPJ
              <Icon type="md-help" @click="spj_help_modal=true"></Icon>
            </p>
            <i-switch v-model="formData.manifest.spj" style="margin-top: 10px">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem label="SPJ Code">
            <label>
              <Input v-model="formData.manifest.spj_code"
                     placeholder="仅支持C语言编写的SPJ"
                     type="textarea"
                     :maxlength="65536"
                     :show-word-limit="true"
                     :disabled="!formData.manifest.spj"
                     @on-keydown="handleKeyDown"
                     class="mono-text"
                     :autosize="{minRows: 10,maxRows: 40}"/>
            </label>
          </FormItem>
        </Form>
      </div>
      <Divider/>
      <Button type="primary" @click="handleSubmit">提交</Button>

    </div>
    <Modal width="800" v-model="spj_help_modal" :closable="false">
      <HelpSPJ/>
    </Modal>
  </div>

</template>

<script>
import {PROBLEM_PUBLIC_TYPE} from "@/utils/constant";
import api from "@/utils/api";
import message from "@/utils/message";
import axios from "axios";
import FileSaver from 'file-saver'
import moment from 'moment'
import HelpSPJ from "@/components/system/problem/HelpSPJ";
import {MAVON_EDITOR_EXTERNAL_LINK, MAVON_EDITOR_TOOLBAR} from "@/utils/editor";

export default {
  name: "AddOrUpdateProblem",
  components: {HelpSPJ},
  data() {
    return {
      externalLink: process.env.NODE_ENV === 'development' ? true : MAVON_EDITOR_EXTERNAL_LINK,
      problem_id: null,
      spj_help_modal: false,
      editor_toolbar: MAVON_EDITOR_TOOLBAR,
      pdfFileList: [],
      formData: {
        editor_text: {
          markdown: '',
          pdf: '',
          legacy: null
        },
        memory_limit: 128,
        time_limit: 1000,
        source: '',
        title: '',
        is_public: 0,
        manifest: {spj: false, spj_code: '', test_cases: [], hash: ''}
      },
      source_choice: PROBLEM_PUBLIC_TYPE,
      uploadConfig: {
        zip_format: ['zip'],
        pdf_format: ['pdf']
      },
      uploadHeaders: {},
      test_cases_col: [
        {
          title: '输入数据',
          key: 'in'
        }, {
          title: '输出数据',
          key: 'out'
        }
      ]
    }
  },
  mounted() {
    this.problem_id = this.$route.params.id || null
    if (this.problem_id) {
      this.updateProblemInit()
    }
    this.uploadHeaders['X-CSRFToken'] = this.getCookie('csrftoken')
  },
  methods: {
    updateProblemInit() {
      api.getAdvancedProblemDetail(this.problem_id).then(res => {
        if (res.data.err === null) {
          this.formData.manifest = res.data.data.manifest || {spj: false, spj_code: '', test_cases: []}
          this.formData.editor_text = res.data.data.content || {markdown: '', pdf: '', legacy: null}
          this.formData.time_limit = res.data.data.time_limit || 1000
          this.formData.memory_limit = res.data.data.memory_limit || 128
          this.formData.title = res.data.data.title || ''
          this.formData.is_public = res.data.data.public || 0
          this.formData.source = res.data.data.source || ''
          if (this.formData.editor_text.pdf !== '') {
            this.pdfFileList = [{
              name: 'default.pdf',
              url: this.formData.editor_text.pdf
            }]
          }
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    },
    handleTabRemove() {
      this.formData.editor_text.legacy = null
    },
    handleSubmit() {
      if (this.problem_id === null) {
        api.postProblemCreate(
            this.formData.title,
            this.formData.editor_text,
            this.formData.source,
            this.formData.time_limit,
            this.formData.memory_limit,
            this.formData.is_public,
            this.formData.manifest
        ).then(res => {
          if (res.data.err === null) {
            this.$Message.success('提交成功')
            this.$router.push('/system/manage_problem')
          } else {
            this.$Message.error('提交失败' + message.err(res.data.err))
          }
        })
      } else {
        api.putProblemUpdate(this.problem_id, this.formData.title,
            this.formData.editor_text,
            this.formData.source,
            this.formData.time_limit,
            this.formData.memory_limit,
            this.formData.is_public,
            this.formData.manifest).then(res => {
          if (res.data.err === null) {
            this.$Message.success('修改成功')
            this.$router.push('/system/manage_problem')
          } else {
            this.$Message.error('修改失败' + message.err(res.data.err))
          }
        })
      }

    },
    onMavonSave(value) {
      let blob = new Blob([value], {type: "text/plain;charset=utf-8"})
      let date = moment().format()
      FileSaver.saveAs(blob, `problem_${date}.md`)
    },
    imageDel(file) {
      axios({
        url: file[0],
        method: 'delete',
      }).then(res => {
        if (res.data.err === null) {
          this.$Message.success('成功删除图片')
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    },
    imageAdd(pos, file) {
      let formData = new FormData();
      formData.append('file', file)
      axios({
        url: '/api/problem/image',
        method: 'put',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res) => {
        if (res.data.err === null) {
          this.$refs.md.$img2Url(pos, res.data.data)
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    },
    onSuccess(res) {
      if (res.err !== null) {
        this.$Message.error('上传失败，' + message.err(res.err))
      } else {
        if (Object.hasOwnProperty.call(res.data, 'test_cases')) {
          this.formData.manifest.test_cases = res.data['test_cases'] || []
        }
        if (Object.hasOwnProperty.call(res.data, 'hash')) {
          this.formData.manifest.hash = res.data['hash'] || ''
        }
      }
    },
    beforePDFUpload() {
      this.$refs.pdfUpload.clearFiles()
    },
    onPDFSuccess(res) {
      if (res.err !== null) {
        this.$Message.error('上传失败，' + message.err(res.err))

      } else {
        this.formData.editor_text.pdf = `/api/problem/pdf?title=${res.data.title}`
      }
    },
    onPDFReview() {
      window.open(this.formData.editor_text.pdf)
    },
    onError(error) {
      this.$Message.error(message.err(error))
    },
    onZIPFormatError(file) {
      this.$Message.error(`文件：${file.name}，格式不正确（仅限zip格式，且是.zip后缀）`)
    },
    onExceededSize(file) {
      console.log(file)
      this.$Message.error(`文件:${file.name},文件大小过大`)
    },
    onPDFFormatError(file) {
      this.$Message.error(`文件：${file.name}，格式不正确（仅限pdf格式，且是.pdf后缀）`)
    },
    onPDFRemove() {
      this.formData.editor_text.pdf = ''
    },
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    },
    handleKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
      }
    }
  },
  watch: {}
}
</script>
<style scoped>
.mono-text {
  font-family: "Ubuntu Mono", "JetBrains Mono", Consolas, Menlo, Courier, monospace;
}
</style>
