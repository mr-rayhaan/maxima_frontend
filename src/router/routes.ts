import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/manage-books",
    component: () => import("@/views/ManageBooks.vue"),
  },
];

export default routes;
