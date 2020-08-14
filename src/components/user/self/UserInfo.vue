<template>
  <div class="main-view">
    <Row>
      <Col span="6">
        <Card dis-hover>
          <img height="100" width="100" class="img-icon" alt="icon" :src="emailHashURL"/>
        </Card>
      </Col>
      <Col span="18">

      </Col>
    </Row>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "UserInfo",
  methods: {

  },
  computed: {
    ...mapGetters(['emailHashURL', 'profile'])
  }
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.img-icon {
  border-radius: 50%;
}
</style>
