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
                {{item.id}}
              </Col>

              <Col span="3" offset="1">
                <Select @on-change="handleOJChange(item.remote_oj)" title="源平台" v-model="item.remote_oj">
                  <Option v-for="lang in support" :key="lang" :value="lang">
                    {{lang}}
                  </Option>
                </Select>
              </Col>
              <Col span="3" offset="1">
                <Input type="text" @on-blur="handleRefresh(index)" v-model="item.remote_id" placeholder="Enter something..."></Input>
              </Col>
              <Col span="2" offset="1">
                <Button @click="handleRefresh(index)">刷新</Button>
              </Col>
              <Col span="2">
                <Button type="error" @click="handleRemove(index)">删除</Button>
              </Col>
              <Col span="6" offset="1">
                <a href="#" style="color: #2d8cf0" @click="handleClick(index)">{{item.title}}</a>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="4" offset="4">
                <Button :disabled="add_disable" @click="handleAdd" icon="plus-round">添加题目</Button>
              </Col>
              <Col span="4">
                <Button type="primary" :disabled="submit_disable" @click="handleSubmitContest">提交题组</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Card>
    </Col>
    <BackTop></BackTop>
  </Row>
</template>

<script>
  import api from '../../api';
  import local from '../../local';

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
      document.title = '新建题组';
    },
    methods: {
      handleOJChange(selected) {
        local.setLastOJ(selected);
      },
      handleOJDefault() {
        if (local.getLastOJ()) {
          return local.getLastOJ();
        }
        return '';
      },
      handleSubmitContest() {
        let item_exist = false;
        let item_cnt = 0;
        let submit_dict = {
          'title': this.formDynamic.title,
          'problems': [],
        };
        for (let i = 0; i < this.formDynamic.items.length; ++i) {
          if (this.formDynamic.items[i].status === 1) {
            item_exist = true;
            item_cnt++;
            let temp_dict = {
              'remote_oj': this.formDynamic.items[i].remote_oj,
              'remote_id': this.formDynamic.items[i].remote_id,
            };
            submit_dict.problems.push(temp_dict);
          }
        }
        console.log(submit_dict);
        api.submitNewContest(submit_dict).then(res => {
          console.log(res);
        }, res => {
          console.log(res);
        })
      },
      handleClick(index) {
        const routeData = this.$router.resolve({
          name: 'problem',
          params: {
            remote_oj: this.formDynamic.items[index].remote_oj,
            remote_id: this.formDynamic.items[index].remote_id
          }
        });
        window.open(routeData.href, '_blank')

      },
      handleAdd() {
        this.add_disable = true;
        this.index++;
        this.formDynamic.items.push({
          id: '',
          remote_oj: this.handleOJDefault(),
          remote_id: '',
          index: this.index,
          status: 1,
          title: '',
          success: false
        });
        console.log(this.formDynamic.items);
        this.submit_disable = true;
        this.handleSubmitChange();
      },
      handleSubmitChange() {
        let item_exist = false;
        let item_cnt = 0;
        for (let i = 0; i < this.formDynamic.items.length; ++i) {
          if (this.formDynamic.items[i].status === 1) {
            item_cnt++;
            this.formDynamic.items[i].id = item_cnt;

          }
        }
        if (item_cnt < 100) {
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
        console.log(this.formDynamic.items[index].remote_oj);
        api.getProblem(this.formDynamic.items[index].remote_oj, this.formDynamic.items[index].remote_id).then(res => {
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
          this.handleOJDefault();
        }, res => {
          console.log(res);
        })
      },
    }
  }
</script>

<style scoped>

</style>
