<template>
  <el-radio-group v-if="Array.isArray(options)" v-model="form[prop]">
    <el-radio-button
      v-for="(item, ind) in options"
      :key="`${prop}-${ind}`"
      :label="item"
    >
      {{ item }}
    </el-radio-button>
  </el-radio-group>
  <div v-else>
    <el-radio
      v-model="form[prop]"
      :label="options.major"
      border
      @change="handleRadioChange"
    >{{ options.major }}</el-radio>

    <div><b>{{ options.tips }}</b></div>

    <el-checkbox-group
      v-if="isCheckbox"
      v-model="boxes[prop]"
      @change="handleCheckboxGroupChange"
    >
      <el-checkbox
        v-for="(item, ind) in options.minor"
        :key="`${prop}-${ind}`"
        :label="item"
        border
      />
    </el-checkbox-group>
    <el-radio-group
      v-else
      v-model="form[prop]"
      @change="handleRadioGroupChange"
    >
      <div
        v-for="(item, ind) in options.minor"
        :key="`${prop}-${ind}`"
        style="margin-bottom: 5px;"
      >
        <el-radio :label="item" border>{{ item }}</el-radio>
      </div>
    </el-radio-group>

    <div v-if="edit">
      <div v-if="edit.label"><b>{{ edit.label }}</b></div>
      <el-input v-model.trim="boxes[edit.prop]" :disabled="edit.disabled" />
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
    },
    boxes: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    prop() {
      return this.node.prop
    },
    options() {
      return this.node.options
    },
    edit() {
      return this.node.edit
    },
    isCheckbox() {
      return this.options.type === 'checkbox'
    }
  },
  methods: {
    handleRadioChange() {
      this.isCheckbox && this.$set(this.boxes, this.prop, [])
      this.handleEditDisabled(true)
    },
    handleCheckboxGroupChange() {
      this.$set(this.form, this.prop, null)
      this.handleEditDisabled(false)
    },
    handleRadioGroupChange(val) {
      this.handleEditDisabled(!(this.edit && this.options.minor[this.edit.for] === val))
    },
    handleEditDisabled(v) {
      this.edit && this.$set(this.edit, 'disabled', v)
    }
  }
}
</script>
