<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="20">
        <thx-org-selector v-model="selected" cascader />
      </el-col>
      <el-col :span="4">
        <el-button
          type="danger"
          size="mini"
          @click="selected = null"
        >Clear</el-button>
      </el-col>
    </el-row>

    {{ selected }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: { id: '58165' }
    }
  }
}
</script>
