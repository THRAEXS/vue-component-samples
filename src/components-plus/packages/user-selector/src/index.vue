<template>
  <thx-pagination-selector
    :multiple="multiple"
    :data="list.data"
    :total="list.total"
    :page.sync="list.query.page"
    :size.sync="list.query.size"
    :loading="list.loading"
    :visible.sync="selectorVisible"
    :value.sync="selected"
    :index="{ label: '序号' }"
    top="13vh"
    width="70%"
    :height="530"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <el-table-column prop="fullName" label="姓名" align="center" width="150" />
    <el-table-column prop="orgName" label="院级单位" align="center" />
    <el-table-column prop="deptName" label="所级单位" align="center" />
    <el-table-column prop="empType" label="用工类型" align="center" width="120" />
    <el-table-column prop="empNo" label="ERP编号" align="center" width="130" />
  </thx-pagination-selector>
</template>
<script>
import { getUserPage, getUserByIds } from '@/api/selector'

export default {
  name: 'ThxUserSelector',
  props: {
    value: {
      type: [Object, Array],
      default() {
        return this.multiple ? [] : null
      }
    },
    multiple: Boolean,
    visible: Boolean
  },
  data() {
    return {
      selectorVisible: false,
      list: {
        loading: false,
        data: [],
        total: 0,
        query: {
          page: 1,
          size: 10,
          params: {}
        }
      },
      selected: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.selected = this.value ? this.multiple ? this.value.map(it => it.id) : this.value.id : null
      }
    },
    visible: {
      immediate: true,
      handler() {
        this.selectorVisible = this.visible
      }
    },
    'list.query': {
      deep: true,
      handler() {
        this.search()
      }
    }
  },
  created() {
    console.warn('Opt: not in created...')
    this.search()
  },
  methods: {
    search() {
      this.list.loading = true
      getUserPage(this.list.query)
        .then(({ data, total }) => Object.assign(this.list, { data, total }))
        .finally(() => (this.list.loading = false))
    },
    async getByIds(ids) {
      return await getUserByIds(ids)
    },
    handleOk() {
      new Promise(resolve => {
        if (this.multiple) {
          if (this.selected && this.selected.length > 0) {
            this.getByIds(this.selected).then(({ data }) => resolve(data))
          } else {
            resolve([])
          }
        } else {
          const one = this.list.data.find(it => it.id === this.selected)
          one ? resolve(one) : this.getByIds([this.selected]).then(({ data: [first] }) => resolve(first || null))
        }
      }).then(data => {
        this.$emit('update:value', data)
        this.$emit('ok', data)
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
