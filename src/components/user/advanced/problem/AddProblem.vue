<template>
  <div>
    <h2 style="text-align: center">添加题目</h2>
    <Divider/>
    <h3 style="text-align: center;margin-bottom: 10px">基础信息</h3>
    <div style="width: 500px;margin: auto">
      <Form :label-width="120">
        <FormItem label="标题">
          <label>
            <Input type="text" v-model="formData.title"/>
          </label>
        </FormItem>
        <FormItem label="时间限制(MS)">
          <label>
            <Input type="number" placeholder="单位:MS" v-model="formData.time_limit"/>
          </label>
        </FormItem>
        <FormItem label="内存限制(MB)">
          <label>
            <Input type="number" placeholder="单位:MB" v-model="formData.memory_limit"/>
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
    <mavon-editor
        ref=md
        @imgAdd="imageAdd"
        @imgDel="imageDel"
        v-model="formData.editor_text.markdown"
        v-bind:boxShadow="false"
        v-bind:tabSize="4"
        codeStyle="atom-one-light"
        v-bind:toolbars="this.editor_config.toolbars"/>

    <Divider/>
    <Button type="primary" @click="handleSubmit">下一步</Button>
  </div>

</template>

<script>
import {MAVON_EDITOR_TOOLBAR_EDIT_MODE, PROBLEM_PUBLIC_TYPE} from '@/utils/constant';
import api from "@/utils/api";
import message from "@/utils/message";
import axios from "axios";


export default {
  name: "AddProblem",
  data() {
    return {
      formData: {
        editor_text: {
          markdown: ''
        },
        memory_limit: 32,
        time_limit: 1000,
        source: '',
        title: '',
        is_public: 0
      },
      editor_config: {
        toolbars: MAVON_EDITOR_TOOLBAR_EDIT_MODE
      },
      source_choice: PROBLEM_PUBLIC_TYPE
    }
  }, methods: {
    handleSubmit() {
      api.postProblemCreate(
          this.formData.title,
          this.formData.editor_text,
          this.formData.source,
          this.formData.time_limit,
          this.formData.memory_limit,
          this.formData.is_public).then(res => {
        if (res.data.err === null) {
          this.$Message.success('提交成功')
          this.$emit('on-add-success')
        } else {
          this.$Message.error('提交失败' + message.err(res.data.err))
        }
      })
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
    }
  }
}
</script>
<style scoped>
</style>
