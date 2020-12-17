<template>
  <el-cascader
    ref="cascader"
    v-model="selected"
    :options="options"
    :props="props"
    :show-all-levels="true"
    :disabled="disabled"
    size="mini"
    clearable
    filterable
    placeholder="请选择组织机构"
    style="width: 350px;"
    @change="handleChange"
  />
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'ThxOrgCascader',
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: Boolean
  },
  data() {
    return {
      selected: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'childOrgList'
      },
      orgList: [],
      options: []
    }
  },
  watch: {
    value() {
      this.handleSelected()
    }
  },
  created() {
    this.requestTree().then(({ data: [root] }) => {
      if (root) {
        this.options = root.childOrgList
        this.orgList = this.treeToList(root)
        this.handleSelected()
      }
    })
  },
  methods: {
    requestTree(lev = 2) {
      return request({ url: '/api/thraex/org/tree', method: 'GET', params: { level: lev + 1 }})
    },
    treeToList(root) {
      const stack = []
      const array = []
      const hashMap = {}

      stack.push(root)

      while (stack.length !== 0) {
        const node = stack.pop()
        const children = node[this.props.children]
        if (!children) {
          if (!hashMap[node.id]) {
            hashMap[node.id] = true
            array.push(node)
          }
        } else {
          for (let i = children.length - 1; i >= 0; i--) {
            stack.push(children[i])
          }
        }
      }

      return array
    },
    handleSelected() {
      if (this.value) {
        const node = this.orgList.find(it => it.id === this.value)
        node && (this.selected = [node.parentId, this.value])
      }
    },
    handleChange(nodes) {
      const val = [...nodes].pop() || null
      this.$emit('update:value', val)
      this.$emit('change', val)
    }
  }
}
</script>
