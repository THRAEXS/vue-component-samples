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
      @change="handleCheckboxChange"
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
    >
      <div
        v-for="(item, ind) in options.minor"
        :key="`${prop}-${ind}`"
        style="margin-bottom: 5px;"
      >
        <el-radio :label="item" border>{{ item }}</el-radio>
      </div>
    </el-radio-group>
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
    isCheckbox() {
      return this.options.type === 'checkbox'
    }
  },
  methods: {
    handleRadioChange() {
      this.isCheckbox && this.$set(this.boxes, this.prop, [])
    },
    handleCheckboxChange() {
      this.$set(this.form, this.prop, null)
    }
  }
}
</script>
