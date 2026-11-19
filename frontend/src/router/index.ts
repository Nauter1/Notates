
import PostsView from "../views/PostsView.vue"
import { createRouter, createWebHistory} from "vue-router"

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/posts"

    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView
    }
  ]
})

export default router