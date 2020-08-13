<template>
  <div class="main-view">
    <pre v-highlightjs="code">
      <code :class="code_type">
      </code>
    </pre>
  </div>
</template>

<script>
export default {
  name: "SubmissionDetail",
  data() {
    return {
      code: 'import os\n\nif __name__ == \'__main__\':\n    print(\'123\')',
      code_type: 'python',
      id: null
    }
  }, mounted() {
    this.id = this.$route.params.id
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
</style>
