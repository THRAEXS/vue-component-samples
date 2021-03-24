<template>
  <thx-tree-selector
    ref="selector"
    v-model="selected"
    :props="props"
    :data="data"
    :cascader="cascader"
    label="选择"
    v-bind="$attrs"
    v-on="listeners"
    @ok="handleOk"
  />
</template>
<script>
import request from '@/utils/request'

const FixedProps = {
  value: 'id',
  label: 'name',
  children: 'childOrgList',
  emitPath: false
}

export default {
  name: 'ThxOrgSelector',
  props: {
    value: {
      type: [Object, Array],
      default() {
        return null
      }
    },
    cascader: Boolean,
    level: {
      type: Number,
      default() {
        return 2
      },
      validator(val) {
        return [1, 2, 3].indexOf(val) !== -1
      }
    }
  },
  data() {
    return {
      data: [],
      selected: null,
      orgMap: new Map()
    }
  },
  computed: {
    props() {
      return Object.assign({}, this.$attrs.props || {}, FixedProps)
    },
    listeners() {
      const { ok, ...others } = this.$listeners
      return others
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        const { value } = this.props
        this.selected = val ? Array.isArray(val)
          ? val.map(it => it[value]) : val[value] : null
      }
    }
  },
  created() {
    this.requestTree(this.level).then(({ data: [root] }) => {
      if (root) {
        this.data = root[this.props.children]
        this.treeToList(root).forEach(it => this.orgMap.set(it[this.props.value], it))
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

      const { value, children: child } = this.props
      while (stack.length !== 0) {
        const node = stack.pop()
        const children = node[child]
        if (!children) {
          if (!hashMap[node[value]]) {
            hashMap[node[value]] = true
            array.push(node)
          }
        } else {
          for (let i = children.length - 1; i >= 0; i--) {
            stack.push(children[i])
          }

          array.push(node)
        }
      }

      return array
    },
    handleOk(value) {
      // console.debug(this.$refs.selector.$refs.selector.$refs.cascader
      //   .$refs.panel.$refs.panel.$refs.tree.getNode)
      const { multiple } = this.$attrs.props || {}

      const result = multiple === true
        ? (value || []).map(v => this.orgMap.get(v))
        : this.orgMap.get(value) || null

      this.$emit('input', result)
      this.$emit('update:value', result)
      this.$emit('ok', result)
    }
  }
}
</script>
