import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Route } from "vue-router";
import { UserModule } from "@/store/modules/user";
import settings from "./settings";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

const getPageTitle = (title: string) => {
  return title || settings.title;
};

router.beforeEach(async (to: Route, _: Route, next: any) => {
  NProgress.start();
  // set page title -- 获取标题
  document.title = getPageTitle(to.meta.title);
  if (UserModule.token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  document.title = getPageTitle(to.meta.title);
});
