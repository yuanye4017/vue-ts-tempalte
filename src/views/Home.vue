<template>
  <div class="home">
    <van-button type="default">默认按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="flex">
      <div class="flex__item"></div>
      <div class="flex__item"></div>
      <div class="flex__item"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button } from "vant";
export default {
  name: "Home",
  components: {
    [Button.name]: Button
  }
};
</script>

<style lang="scss" scoped>
// .home {
//   background: $bg;
//   transform: rotate(3deg);
// }
.flex {
  display: flex;
  justify-content: space-between;
  &__item {
    width: 100px;
    height: 100px;
    background: orange;
  }
}
</style>
