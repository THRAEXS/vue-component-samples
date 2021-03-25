<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="22">
        <thx-org-selector v-model="selected" />
      </el-col>
      <el-col :span="2">
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
