// eslint-disable-next-line import/no-unresolved
import "@unocss/reset/tailwind.css";

import "uno.css";

import { createSSRApp, Component } from "vue";

import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  RouteRecordRaw,
} from "vue-router";

import ElSimple from "./el/ElSimple.vue";
import PageAbout from "./el/PageAbout.vue";
import PageHome from "./el/PageHome.vue";
import PageOther from "./el/PageOther.vue";
import PageSingle from "./el/PageSingle.vue";
import PageWrap from "./el/PageWrap.vue";
class TestClass {
  constructor(el: Component) {
    console.log("TestClass", el);
  }
}

export const whatever = new TestClass(ElSimple);

export const initApp = (config: { env: "server" | "client" }) => {
  const { env } = config;
  const app = createSSRApp(PageWrap as Component);
  const history = env == "server" ? createMemoryHistory() : createWebHistory();
  const routes: RouteRecordRaw[] = [
    {
      name: "home",
      path: "/",
      component: PageHome,
    },
    { name: "tour", path: "/tour", component: PageSingle },
    { name: "pricing", path: "/pricing", component: PageOther },
    { name: "about", path: "/about", component: PageAbout },
  ];
  const router = createRouter({ history, routes });

  app.use(router);

  app.provide("whatever", whatever);

  return { app, router, whatever };
};
