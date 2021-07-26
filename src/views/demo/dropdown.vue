<template>
  <div class="app-container">
    <el-card>
      <div
        :style="{ height: `${height}px` }"
        class="menu-box"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
      >
        <el-dropdown
          trigger="click"
          style="border: 1px solid red;"
          @visible-change="handleVisibleChange"
        >
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" style="border: 1px solid red;" @visible-change="handleVisibleChange">
          <span class="el-dropdown-link">
            下拉菜单1<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 100,
      lock: false
    }
  },
  methods: {
    handleEnter() {
      console.debug('enter menu box')
      this.height = 250
    },
    handleLeave() {
      if (this.lock) return
      console.debug('leave menu box')
      this.height = 100
    },
    handleVisibleChange(val) {
      console.log('handleVisibleChange', arguments)
      this.lock = val
    }
  }
}
</script>
<style scoped>
.menu-box {
  border: 1px solid red;
}
.menu-item {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
</style>
