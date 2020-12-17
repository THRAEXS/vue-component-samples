<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Demo">
      <slot name="demo" />
    </el-tab-pane>
    <el-tab-pane label="Code">
      <slot />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'ThxDemoCode'
}
</script>
