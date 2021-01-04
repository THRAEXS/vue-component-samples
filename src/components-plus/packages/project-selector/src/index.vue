<template>
  <thx-base-pagination-selector
    ref="thxBps"
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
        <el-row>
          <el-col v-if="conditions.projectOrgId.visible" :span="8">
            <el-form-item label="所级单位:">
              <thx-org-cascader
                :value.sync="params.projectOrgId"
                :disabled="conditions.projectOrgId.disabled"
                :cascader-style="conditionStyle"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="conditions.projectName.visible" :span="8" align="center">
            <el-form-item label="项目名称:">
              <el-input
                v-model="params.projectName"
                size="mini"
                clearable
                :disabled="conditions.projectName.disabled"
                placeholder="请输入项目名称"
                :style="conditionStyle"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="conditions.dictProjectStatisticsTypeList.visible" :span="8" align="right">
            <el-form-item label="业务类型:">
              <el-select
                v-model="params.dictProjectStatisticsTypeList"
                size="mini"
                multiple
                clearable
                placeholder="请选择业务类型"
                :style="conditionStyle"
              >
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
    <el-table-column prop="expenseCode" label="经费编号" align="center" width="100" />
    <el-table-column prop="projectOrgName" label="承担单位" align="center" width="200" />
    <el-table-column prop="unionOrgName" label="院内参加单位" header-align="center" width="400" show-overflow-tooltip />
    <el-table-column prop="annual" label="计划年度" align="center" width="80" />
  </thx-base-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '~/mixins/pagination-selector'
import ConditionMixin from '~/mixins/condition'

import request from '@/utils/request'

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
        projectName: null,
        dictProjectStatisticsTypeList: null
      },
      types: [],
      conditionStyle: {
        width: '350px'
      },
      defaultItem: {
        projectOrgId: { disabled: false, visible: false, value: null },
        projectName: { disabled: false, visible: true, value: null },
        dictProjectStatisticsTypeList: { disabled: false, visible: false, value: null }
      }
    }
  },
  computed: {
    conditions() {
      const conds = {}

      Object.keys(this.params).forEach(it => {
        const item = this.props[it] || ''
        conds[it] = Object.assign({}, this.defaultItem[it],
          typeof item === 'string' ? { value: item } : item)
      })

      return conds
    }
  },
  created() {
    this.requestTypes().then(({ data }) => (this.types = data))
  },
  methods: {
    requestTypes() {
      return request({ url: '/api/thraex/project/types', method: 'GET' })
    }
  }
}
</script>
