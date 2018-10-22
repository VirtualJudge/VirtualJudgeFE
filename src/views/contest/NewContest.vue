<template>
  <Row>
    <Col push="4" span="16">
      <Card style="margin: 10px">
        <div slot="title">
          添加题目
        </div>
        <Form ref="formDynamic" :model="formDynamic">
          <FormItem>
            <Row>
              <Col span="2">
                标题
              </Col>
              <Col span="12" offset="1">
                <Input v-model="formDynamic.title" placeholder="Enter something..."></Input>
              </Col>
            </Row>

          </FormItem>
          <FormItem
            v-for="(item, index) in formDynamic.items"
            v-if="item.status"
            :key="index">
            <Row>
              <Col span="2">
                题目
              </Col>

              <Col span="3" offset="1">
                <Select title="源平台" v-model="item.language">
                  <Option v-for="lang in support" :key="lang" :value="lang">
                    {{lang}}
                  </Option>
                </Select>
              </Col>
              <Col span="3" offset="1">
                <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
              </Col>
              <Col span="2" offset="1">
                <Button type="ghost" @click="handleRefresh(index)">刷新</Button>
              </Col>
              <Col span="2">
                <Button type="error" @click="handleRemove(index)">删除</Button>
              </Col>
              <Col offset="1">

              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="4" offset="6">
                <Button type="dashed" :disabled="add_disable" @click="handleAdd" icon="plus-round">添加题目</Button>
              </Col>
              <Col span="4">
                <Button type="primary" :disabled="submit_disable">提交题组</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api';

  export default {
    name: "NewContest",
    data() {
      return {
        add_disable: false,
        submit_disable: true,
        support: [],
        formDynamic: {
          title: '',
          items: []
        }
      }
    },
    mounted() {
      this.getSupport();
    },
    methods: {
      handleAdd() {
        this.add_disable = true;
        this.index++;
        this.formDynamic.items.push({
          value: '',
          index: this.index,
          language: this.support[0],
          status: 1,
          title: '',
          success: false
        });
        this.submit_disable = true;
        this.handleSubmitChange();
      },
      handleSubmitChange() {
        let item_exist = false;
        let item_cnt = 0;
        for (let i = 0; i < this.formDynamic.items.length; ++i) {
          if(this.formDynamic.items[i].status === 1){
            item_cnt++;
          }
        }
        if (item_cnt < 30){
          this.add_disable = false;
        }
        for (let i = 0; i < this.formDynamic.items.length; ++i) {
          if (this.formDynamic.items[i].status === 0) {
            continue;
          }
          item_exist = true;
          if (this.formDynamic.items[i].success === false) {
            this.submit_disable = true;
            return;
          }
        }
        if (item_exist === true) {
          this.submit_disable = false;
        }
      },
      handleRefresh(index) {
        console.log(this.formDynamic.items[index].language);
        console.log(this.formDynamic.items[index].value);
        api.getProblem(this.formDynamic.items[index].language, this.formDynamic.items[index].value).then(res => {
          console.log(res);
          this.formDynamic.items[index].title = res.data.data.title;
          this.formDynamic.items[index].success = res.data.data.request_status === 2;
          this.handleSubmitChange();
        }, res => {
          console.log(res);
          this.formDynamic.items[index].success = false;
          this.handleSubmitChange();
        })
      },
      handleRemove(index) {
        this.formDynamic.items[index].status = 0;
        this.handleSubmitChange();
      },
      getSupport() {
        api.getSupport().then(res => {
          this.support = res.data.data;
        }, res => {
          console.log(res);
        })
      },
    }
  }
</script>

<style scoped>

</style>
