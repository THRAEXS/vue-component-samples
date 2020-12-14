<template>
  <thx-base-pagination-selector
    v-model="selected"
    :multiple="multiple"
    :visible.sync="selectorVisible"
    :top="top"
    :width="width"
    :height="height"
    :api-page="api.page"
    :api-ids="api.ids"
    :conditions="conditions"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <template v-slot:condition>
      <el-input v-model="conditions.name" />
    </template>
    <el-table-column prop="fullName" label="姓名" align="center" width="150" />
    <el-table-column prop="orgName" label="院级单位" align="center" />
    <el-table-column prop="deptName" label="所级单位" align="center" />
    <el-table-column prop="empType" label="用工类型" align="center" width="120" />
    <el-table-column prop="empNo" label="ERP编号" align="center" width="130" />
  </thx-base-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '@cp/mixins/pagination-selector'

export default {
  name: 'ThxUserSelector',
  mixins: [PaginationSelectorMixin],
  data() {
    return {
      api: {
        page: '/api/thraex/user/page',
        ids: '/api/thraex/user/ids'
      },
      conditions: {
        name: 'GUI'
      }
    }
  }
}
</script>
