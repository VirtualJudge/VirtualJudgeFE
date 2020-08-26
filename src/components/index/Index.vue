<template>
    <div class="main-view">
        <h2>{{ $t('pages.index.index') }}</h2>
        <p>Time is limited, everyday is <strong>deadline</strong>.</p>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
.main-view{
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>
