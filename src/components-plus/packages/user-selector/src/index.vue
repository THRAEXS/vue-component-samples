<template>
  <thx-base-pagination-selector
    ref="thxBps"
    v-model="selected"
    :multiple="multiple"
    :visible.sync="selectorVisible"
    :top="top"
    :width="width"
    :height="height"
    :api-page="api.page"
    :api-ids="api.ids"
    :params="params"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <template v-slot:condition>
      <el-form :inline="true">
        <el-form-item v-if="conditions.deptId.visible" label="所级单位:">
          <thx-org-cascader
            :value.sync="params.deptId"
            :disabled="conditions.deptId.disabled"
          />
        </el-form-item>
        <el-form-item v-if="conditions.username.visible" label="姓名或账号:">
          <el-input
            v-model="params.username"
            size="mini"
            clearable
            :disabled="conditions.username.disabled"
            placeholder="请输入人员姓名/拼音/账号"
            style="width: 350px;"
          />
        </el-form-item>
      </el-form>
    </template>

    <el-table-column prop="fullName" label="姓名" align="center" width="120" />
    <el-table-column prop="orgName" label="院级单位" align="center" />
    <el-table-column prop="deptName" label="所级单位" align="center" />
    <el-table-column prop="empType" label="用工类型" align="center" width="120" />
    <el-table-column prop="empNo" label="ERP编号" align="center" width="120" />
  </thx-base-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '~/mixins/pagination-selector'
import ConditionMixin from '~/mixins/condition'

export default {
  name: 'ThxUserSelector',
  mixins: [PaginationSelectorMixin, ConditionMixin],
  data() {
    return {
      api: {
        page: '/api/thraex/user/page',
        ids: '/api/thraex/user/ids'
      },
      params: {
        deptId: null,
        username: null
      }
    }
  }
}
</script>
