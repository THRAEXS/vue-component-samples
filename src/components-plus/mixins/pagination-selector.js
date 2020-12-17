export default {
  props: {
    value: [Object, Array],
    multiple: Boolean,
    visible: Boolean,
    top: {
      type: String,
      default: '13vh'
    },
    width: String,
    height: {
      type: [String, Number],
      default: 530
    }
  },
  data() {
    return {
      selectorVisible: false,
      selected: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.selected = this.value
      }
    },
    visible: {
      immediate: true,
      handler() {
        this.selectorVisible = this.visible
      }
    }
  },
  methods: {
    getByIds(ids, full) {
      return this.$refs.thxBps.getByIds(ids, full)
    },
    handleOk(data) {
      this.$emit('update:value', data)
      this.$emit('ok', data)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  }
}
