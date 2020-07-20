<template>
  <div class="layout">
    <main class="layout__main">
      <router-view />
    </main>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabbar from "./components/Tabbar.vue";

@Component({
  name: "Layout",
  components: {
    Tabbar
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
