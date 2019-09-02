import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/index'
// import { getMenuList } from '@/apis/data'
// let route_list = [];
// getMenuList().then(function (res) {
//   route_list=res.data.data
// })
// let route_child=[];
// route_list.forEach((item,index) => {
//   if(item.code == '01'){
//     route_child.push({
//           path: 'facepredator',
//           name: 'Facepredator',
//           component: () => import('@/views/gallery/facepredator'),
//           meta: { title: '重点人布控', icon: 'facepredator' }
//     })
//   }
// })



export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/login')
  },

  {
    path: '/',
    component: Layout,
    redirect: '/master',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/master',
    component: Layout,
    name: 'master',
    redirect: '/master/create',
    meta: { title: '任务列表', icon: 'icon_master' },
    children: [
      {
        path: 'create',
        name: 'Create',
        hidden: true,
        tab:true,
        component: () => import('@/views/master/create'),
        meta: { title: '正在执行', icon: 'create' },

      },
      {
        path: 'complete',
        name: 'Complete',
        hidden: true,
        tab:true,
        component: () => import('@/views/master/complete'),
        meta: { title: '执行结束', icon: 'complete' },
      },
      {
        path: 'masterdetail',
        name: 'MasterDetail',
        hidden: true,
        component: () => import('@/views/master/masterdetail'),
        meta: { title: '任务详情', icon: 'masterDetail' }
      }
    ]
  },

  {
    path: '/gallery',
    component: Layout,
    redirect: '/gallery/facepredator',
    name: 'gallery',
    meta: { title: '基础图库', icon: 'icon-gallery' },
    // children:route_child
    children: [
      {
        path: 'facepredator',
        name: 'Facepredator',
        component: () => import('@/views/gallery/facepredator'),
        meta: { title: '重点人布控', icon: 'facepredator' }
      },
      // {
      //   path: 'imageresource',
      //   name: 'Imageresource',
      //   component: () => import('@/views/gallery/imageresource'),
      //   meta: { title: '图片溯源', icon: 'image-resource' }
      // },
      {
        path: 'gallerydetail',
        name: 'Gallerydetail',
        hidden: true,
        component: () => import('@/views/gallery/gallerydetail'),
        meta: { title: '详情公共', icon: 'gallerydetail' }
      }
    ]
  },

  { path: '*', redirect: '/login', hidden: true }
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
