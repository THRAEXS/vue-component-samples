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
    :top="top"
    :width="width"
    :height="height"
    :index="index"
    @ok="assembly"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <template v-slot:prepend>
      <slot name="condition" />
    </template>

    <slot />
  </thx-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '@cp/mixins/pagination-selector'

import request from '@/utils/request'
import qs from 'qs'

export default {
  name: 'ThxBasePaginationSelector',
  mixins: [PaginationSelectorMixin],
  props: {
    apiPage: {
      type: String,
      required: true
    },
    apiIds: {
      type: String,
      required: true
    },
    conditions: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Object,
      default() {
        return { label: '序号' }
      }
    }
  },
  data() {
    return {
      list: {
        loading: false,
        data: [],
        total: 0,
        query: {
          page: 1,
          size: 10,
          params: {}
        }
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.selected = this.value ? this.multiple ? this.value.map(it => it.id) : this.value.id : null
      }
    },
    'list.query': {
      deep: true,
      handler() {
        this.search()
      }
    },
    conditions: {
      immediate: true,
      handler() {
        Object.assign(this.list.query, { params: this.conditions })
      }
    }
  },
  mounted() {
    console.warn('Optimize: not in here...')
    this.search()
  },
  methods: {
    requestPage(params) {
      return this.apiPage
        ? request({ url: this.apiPage, method: 'GET', params, paramsSerializer: p => qs.stringify(p) })
        : new Promise(resolve => resolve({ data: [], total: 0 }))
    },
    requestByIds(ids) {
      return this.apiIds
        ? request({ url: this.apiIds, method: 'GET', params: { ids }})
        : new Promise(resolve => resolve({ data: [] }))
    },
    search() {
      this.list.loading = true
      this.requestPage(this.list.query)
        .then(({ data, total }) => Object.assign(this.list, { data, total }))
        .finally(() => (this.list.loading = false))
    },
    assembly() {
      new Promise(resolve => {
        if (this.multiple) {
          if (this.selected && this.selected.length > 0) {
            this.requestByIds(this.selected).then(({ data }) => resolve(data))
          } else {
            resolve([])
          }
        } else {
          const one = this.list.data.find(it => it.id === this.selected)
          one ? resolve(one) : this.requestByIds([this.selected]).then(({ data: [first] }) => resolve(first || null))
        }
      }).then(data => this.handleOk(data))
    }
  }
}
</script>
