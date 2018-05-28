<template>
  <div>
    <Card>
      <Table></Table>
    </Card>
    <Card>
      <codemirror :options="cmOptions" v-model="formItem.code"
                  style="margin-top:5px;border: 1px gainsboro solid;"></codemirror>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "Submission",
    data() {
      return {
        cmOptions: {
          tabSize: 4,
          lineNumbers: true,
          line: true,
          lineNumberFormatter: (line) => {
            return ''
          }
        },
        submission_id: '',
        verdict: {
          code: '',
        },

      }
    }
  }
</script>

<style scoped>

</style>
