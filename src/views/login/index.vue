<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        left-icon="manager"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        left-icon="lock"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          :loading="loading"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Dictionary } from "vue-router/types/router";
import { Form, Button, Field } from "vant";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "EditArticle",
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  }
})
export default class extends Vue {
  private username = "admin";
  private password = "admin";
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};
  private loading = false;

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }
  async onSubmit(values: { username: string; password: string }) {
    this.loading = true;
    await UserModule.Login(values);
    await setTimeout(() => {
      this.loading = false;
      this.$router.push({
        path: this.redirect || "/",
        query: this.otherQuery
      });
    }, 500);
  }
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
