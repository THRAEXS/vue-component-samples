<template>
  <div class="case-layout">
    <el-row :gutter="5">
      <el-col :span="12">
        <h4>弹框模式</h4>
      </el-col>
      <el-col :span="12">
        <h4>级联模式</h4>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="12">
        <slot name="left" />
      </el-col>
      <el-col :span="12">
        <slot name="right" />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.case-layout h4 {
  margin: 5px 0;
}
</style>
