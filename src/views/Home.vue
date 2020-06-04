<template>
  <div class="home">
    <div class="home__header">
      <van-nav-bar title="首页">
        <template #left>
          <van-icon name="bars" size="20" @click="showModel = true" />
        </template>
        <template #right>
          <van-icon name="search" size="20" />
        </template>
      </van-nav-bar>
    </div>
    <div class="home__banner">
      <van-swipe :loop="false" class="my-swipe" :width="300" :height="160">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <van-image
            width="100%"
            height="100%"
            :src="item.picUrl"
            fit="contain"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home__button">
      <van-panel>
        <template #header>
          <van-cell title="展示按钮" icon="location-o" />
        </template>
        <div>
          <van-button type="default">默认按钮</van-button>
          <van-button type="info">信息按钮</van-button>
          <van-button type="warning">警告按钮</van-button>
          <van-button type="danger">危险按钮</van-button>
        </div>
      </van-panel>
    </div>
    <van-popup
      v-model="showModel"
      position="left"
      :style="{ width: '60%', height: '100%' }"
    >
      <van-button type="default" @click="logout">退出</van-button>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Button,
  NavBar,
  Swipe,
  SwipeItem,
  Icon,
  Panel,
  Cell,
  CellGroup,
  Popup,
  Image as VanImage
} from "vant";
import { UserModule } from "@/store/modules/user";
@Component({
  name: "Home",
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [VanImage.name]: VanImage
  }
})
export default class extends Vue {
  private banner = null;
  private showModel = false;
  created() {
    this.$webApi.banners().then(({ data }: any) => {
      console.log(1111, data);
      this.banner = data;
    });
  }
  async logout() {
    await UserModule.LogOut();
    this.$router.push({
      path: "/login"
    });
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item:nth-of-type(n) {
  background-color: orange;
}
.my-swipe .van-swipe-item:nth-of-type(2n) {
  background-color: #39a9ed;
}
.home__button {
  padding: 10px 0;
  .van-cell__title {
    text-align: left;
  }
  .van-panel__content {
    padding: 20px 5px;
  }
}
</style>
