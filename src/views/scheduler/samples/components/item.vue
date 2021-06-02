<template>
  <div>
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

    <div v-if="item.edit" style="margin-top: 5px;">
      <!-- <div class="form-tips">{{ item.edit.label }}</div> -->
      <el-input
        v-show="item.edit.visible"
        v-model.trim="form[item.edit.prop]"
        :placeholder="`请填写${item.edit.label}`"
      />
    </div>
  </div>
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
      const { multiple, major, minor } = this.item.options
      if (multiple) {
        const [first] = val
        const sorts = this.item.options.minor
          .map((it, ind) => ({ [it]: ind }))
          .reduce((acc, item) => Object.assign(acc, item), {})
        this.form[this.item.prop] = major === first ? [first]
          : val.filter(it => it !== major).sort((a, b) => sorts[a] - sorts[b])
      }

      const { edit } = this.item
      if (edit) {
        if (edit.non) {
          this.form[this.item.prop].includes(major) && this.$set(this.form, this.item.edit.prop, null)
        }

        if (edit.for !== undefined) {
          edit.visible = minor[edit.for] === val
          !edit.visible && this.$set(this.form, this.item.edit.prop, null)
        }
      }
    }
  }
}
</script>
<style scoped>
/* .form-tips {
  font-size: 14px;
  font-weight: 600;
} */
</style>
