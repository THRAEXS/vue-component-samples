<template>
  <div>
    <el-row type="flex">
      <el-col :span="4">
        <div class="bc" />
        <div class="bc" />
        <div class="bc" />
      </el-col>
      <el-col :span="20">
        <div class="bc-sample" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="mc-3">
        <menu-circle3 />
      </el-col>
      <el-col :span="12" class="mc-3">
        <menu-circle3 />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <menu-circle1 />
      </el-col>
      <el-col :span="12" class="mc-2">
        <menu-circle2 />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    MenuCircle1: () => import('./menu-circle1'),
    MenuCircle2: () => import('./menu-circle2'),
    MenuCircle3: () => import('./menu-circle3')
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
.mc-3 {
  padding: 20px;
}
.mc-3:nth-child(2) {
  /* background-color: #60656b; */
  background-color: green;
}
.bc {
  width: 200px;
  height: 50px;
  margin: 20px;
  border: 1px solid;
}
.bc:nth-child(1) {
  /* background-color: #0e283e; */
  background-color: rgb(14, 40, 62);
}
.bc:nth-child(2) {
  /* background-color: #507089; */
  background-color: rgb(80, 112, 137);
}
.bc:nth-child(3) {
  /* background-color: #a0b9d0; */
  background-color: rgb(160, 185, 208);
}
.bc-sample {
  width: 400px;
  height: 100px;
  margin: 20px;
  border: 1px solid;

  /* background: linear-gradient(blue, pink); */
  /* background: linear-gradient(to right, blue, pink); */
  /* background: linear-gradient(to bottom right, blue, pink); */
  /* background: linear-gradient(to top left, blue, pink); */
  /* background: linear-gradient(to right, rgb(14, 40, 62), rgb(80, 112, 137), rgb(160, 185, 208)); */
  background: linear-gradient(90deg, rgb(160, 185, 208), 15%, rgb(14, 40, 62), 90%, rgb(160, 185, 208));
  /* background: linear-gradient(blue, 10%, pink); */
  /* background: linear-gradient(70deg, blue, pink); */
  /* background: linear-gradient(90deg, red, yellow, blue, orange); */
  /* background: linear-gradient(to left, lime 28px, red 77%, cyan); */
  /* background: linear-gradient(to bottom left, cyan 50%, palegoldenrod 50%); */
  /* background: linear-gradient(blue, 10%, pink); */
  /* background: linear-gradient(to left,
       lime 20%, red 30%, red 45%, cyan 55%, cyan 70%, yellow 80% );
   background: linear-gradient(to left,
       lime 20%, red 30% 45%, cyan 55% 70%, yellow 80% ); */
  /* background:
      linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
      linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%); */

  /* background: radial-gradient(red, blue); */
}
</style>
