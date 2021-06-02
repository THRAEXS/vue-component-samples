<template>
  <el-select
    v-model="form[item.prop]"
    :multiple="item.options.multiple"
    clearable
    :placeholder="`请选择${item.label}`"
    style="width: 100%;"
    @change="handleChange"
  >
    <el-option
      :value="item.options.major"
      :label="item.options.major"
    />
    <el-option-group :label="item.options.tips">
      <el-option
        v-for="(it, ind) in item.options.minor"
        :key="`minor-${item.prop}-${ind}`"
        :value="it"
        :label="it"
      />
    </el-option-group>
  </el-select>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleChange(val) {
      const { multiple, major } = this.item.options
      if (multiple) {
        const [first] = val
        const sorts = this.item.options.minor
          .map((it, ind) => ({ [it]: ind }))
          .reduce((acc, item) => Object.assign(acc, item), {})
        this.form[this.item.prop] = major === first ? [first]
          : val.filter(it => it !== major).sort((a, b) => sorts[a] - sorts[b])
      }
    }
  }
}
</script>
