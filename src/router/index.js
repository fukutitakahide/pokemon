import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../components/HomeView.vue"
import PokemonDetail from "../components/PokemonDetail.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    },
    {
    path: '/pokemon/:id',
    name: 'PokemonDetail',
    component: PokemonDetail
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router;