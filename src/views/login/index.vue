<template>
  <div class="container">
    <el-card class="my-card"></el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  //center - background-position
  //cover - background-size
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    position: absolute;
    width: 450px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
