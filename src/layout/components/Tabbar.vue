<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">
      首页
    </van-tabbar-item>
    <van-tabbar-item replace to="/follow" icon="search">
      关注
    </van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="setting-o">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Tabbar, TabbarItem } from "vant";

@Component({
  name: "Tabbar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
})
export default class extends Vue {
  private active = 0;
}
</script>
<style scoped>
.layout__main {
  padding-bottom: 50px;
}
</style>
