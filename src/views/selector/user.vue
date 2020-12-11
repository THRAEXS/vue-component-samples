<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <thx-table :data="users">
        <el-table-column type="index" label="No." align="center" width="50" />
        <!-- <el-table-column prop="full_name" label="Name" align="center" /> -->
        <el-table-column prop="projectName" label="Name" align="center" />
      </thx-table>
    </el-col>
    <el-col :span="12">
      <thx-pagination-table
        :data="list.data"
        :total="list.total"
        :page.sync="list.query.page"
        :size.sync="list.query.size"
      >
        <!-- <el-table-column prop="full_name" label="Name" align="center" /> -->
        <el-table-column prop="projectName" label="Name" align="center" />
      </thx-pagination-table>
    </el-col>
  </el-row>
</template>
<script>
import {
  // getUserPage,
  // getUserByIds,
  getProjectPage,
  getProjectByIds
} from '@/api/selector'

export default {
  name: 'CaseUserSelector',
  data() {
    return {
      users: [],
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
    'list.query': {
      deep: true,
      handler() {
        this.userPage()
      }
    }
  },
  created() {
    this.userAll()
    this.userPage()
  },
  methods: {
    userAll() {
      getProjectByIds().then(data => (this.users = data.data))
    },
    userPage() {
      getProjectPage(this.list.query).then(({ data, total }) => {
        this.list.data = data
        this.list.total = total
      })
    }
  }
}
</script>
