<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" >
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.subMenuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import { getMenuList } from '@/apis/data'
import { debug, debuglog } from 'util';

export default {
  components: { SidebarItem },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const index = this.$router.options.routes.findIndex((item) => {
        return item.name === 'gallery'
      })
      
      let list = [...this.$router.options.routes]
      list[index].menus = this.menus
      return list
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    const self = this
    getMenuList().then(function(res) {
      res.data.data.forEach(element => {
        const item = {
          path: 'facepredator',
          name: 'Facepredator',
          component: () => import('@/views/gallery/facepredator'),
          meta: { title: '重点人布控', icon: 'facepredator' }
        }
        self.menus.push(item)
      });
    })
  }
}
</script>
