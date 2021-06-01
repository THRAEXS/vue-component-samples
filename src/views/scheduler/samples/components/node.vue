<template>
  <div>
    <div
      v-for="(option, ind) in node.options"
      :key="`${node.prop}-${ind}`"
      style="margin-bottom: 5px;"
    >
      <div v-if="ind === 1 && node.tips"><b>{{ node.tips }}</b></div>
      <el-radio v-model="form[node.prop]" :label="option" border>{{ option }}</el-radio>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    node: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
