import { createWebHistory, createRouter } from "vue-router"
import Home from "../views/Home.vue"
import ShowMens from "../views/products/ShowMens.vue"
import ShowWomens from "../views/products/ShowWomens.vue"
import Details from "../components/products/Details.vue"
import ShowCarts from "../views/ShowCarts.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mens",
    name: "ShowMens",
    component: ShowMens,
  },
  {
    path: "/womens",
    name: "ShowWomens",
    component: ShowWomens,
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
    params: true,
  },
  {
    path: "/carts",
    name: "ShowCarts",
    component: ShowCarts,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
