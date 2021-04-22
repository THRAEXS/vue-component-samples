<template>
  <el-row>
    <el-col :span="12">
      <menu-circle1 />
    </el-col>
    <el-col :span="12" class="mc-2">
      <menu-circle2 />
    </el-col>
  </el-row>
</template>
<script>
export default {
  components: {
    MenuCircle1: () => import('./menu-circle1'),
    MenuCircle2: () => import('./menu-circle2')
  }
}
</script>
<style scoped>
.el-col {
  border: 1px solid;
}
.mc-2 {
  padding: 50px;
}
</style>
