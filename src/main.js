import { createApp } from "vue"
import "./index.css"
import App from "./App.vue"
import router from "./router"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import mitt from "mitt"
import { cart } from "./composable/useCart"

import {
  faMoon,
  faSun,
  faCartShopping,
  faBars,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons"
const app = createApp(App)
library.add(
  faMoon,
  faSun,
  faCartShopping,
  faBars,
  faArrowRight,
  faArrowLeft,
  fab,
  faPlus,
  faMinus
)

app.use(router).provide("cart", cart).mount("#app")
