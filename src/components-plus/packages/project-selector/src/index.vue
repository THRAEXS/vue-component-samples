<template>
  <thx-base-pagination-selector
    v-model="selected"
    :multiple="multiple"
    :visible.sync="selectorVisible"
    :top="top"
    :width="width"
    :height="height"
    :index="{ fixed: true }"
    :api-page="api.page"
    :api-ids="api.ids"
    :params="params"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <template v-slot:condition>
      <el-form :inline="true">
        <el-form-item v-if="conditions.projectOrgId.visible" label="所级单位:">
          <thx-org-cascader
            :value.sync="params.projectOrgId"
            :disabled="conditions.projectOrgId.disabled"
          />
        </el-form-item>
        <el-form-item v-if="conditions.projectName.visible" label="项目名称:">
          <el-input
            v-model="params.projectName"
            size="mini"
            clearable
            :disabled="conditions.projectName.disabled"
            placeholder="请输入项目名称"
            style="width: 350px;"
          />
        </el-form-item>
      </el-form>
    </template>

    <el-table-column
      prop="projectName"
      label="项目(课题/专题)名称"
      header-align="center"
      width="350"
      show-overflow-tooltip
      fixed
    />
    <el-table-column prop="projectFrom" label="项目来源" align="center" width="160" />
    <el-table-column prop="projectType" label="项目类型" align="center" width="160" />
    <el-table-column prop="projectOrgName" label="承担单位" align="center" width="200" />
    <el-table-column prop="unionOrgName" label="院内参加单位" header-align="center" width="400" show-overflow-tooltip />
    <el-table-column prop="annual" label="计划年度" align="center" width="80" />
  </thx-base-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '~/mixins/pagination-selector'
import ConditionMixin from '~/mixins/condition'

export default {
  name: 'ThxProjectSelector',
  mixins: [PaginationSelectorMixin, ConditionMixin],
  data() {
    return {
      api: {
        page: '/api/thraex/project/page',
        ids: '/api/thraex/project/ids'
      },
      params: {
        projectOrgId: null,
        projectName: null
      }
    }
  }
}
</script>
