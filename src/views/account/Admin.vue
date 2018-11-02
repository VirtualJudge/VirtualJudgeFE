<template>
  <Row>
    <Col span="6">
      <Card style="margin: 10px" :padding="0" title="操作" icon="md-list">
        <CellGroup>
          <Cell title="统计"/>
          <Cell title="修改部分设置"/>
        </CellGroup>
      </Card>
    </Col>
    <Col span="18">
      <Card style="margin: 10px">

      </Card>
    </Col>
  </Row>

</template>

<script>
  export default {
    name: "Admin"
  }
</script>

<style scoped>
  ul li {
    list-style: none;
    margin: 5px auto;
  }
</style>
