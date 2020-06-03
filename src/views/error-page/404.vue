<template>
  <div>
    <van-empty image="error" description="404" />
    <van-button type="primary" to="/">回到首页</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Empty, Button } from "vant";

@Component({
  name: "EditArticle",
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button
  }
})
export default class extends Vue {}
</script>
