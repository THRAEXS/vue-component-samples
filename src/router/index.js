import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'clusterize/table',
        name: 'Clusterize',
        component: () => import('@/views/table/clusterize'),
        meta: { title: 'Clusterize', icon: 'table' }
      },
      {
        path: 'pl/table',
        name: 'PlTable',
        component: () => import('@/views/table/pl-table'),
        meta: { title: 'pl-table', icon: 'table' }
      },
      {
        path: 'pl/table/v2',
        name: 'PlTableV2',
        component: () => import('@/views/table/pl-table-v2'),
        meta: { title: 'pl-table-v2', icon: 'table' }
      },
      {
        path: 'big/table',
        name: 'BigTable',
        component: () => import('@/views/table/big'),
        meta: { title: 'Big Table', icon: 'table' }
      },
      {
        path: 'draw/table',
        name: 'DrawTable',
        component: () => import('@/views/table/draw'),
        meta: { title: 'Draw', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'fund/pl/table',
        name: 'FundPlTable',
        component: () => import('@/views/table/fund-pl-table'),
        meta: { title: 'Fund Pl Table', icon: 'example' }
      },
      {
        path: 'fund/clusterize',
        name: 'FundClusterize',
        component: () => import('@/views/table/fund-clusterize'),
        meta: { title: 'Fund Clusterize', icon: 'example' }
      },
      {
        path: 'table/loading',
        name: 'TableLoading',
        component: () => import('@/views/table/loading'),
        meta: { title: 'Loading', icon: 'example' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  {
    path: '/charts',
    component: Layout,
    meta: { title: 'Charts', icon: 'el-icon-pie-chart' },
    children: [
      {
        path: '',
        component: () => import('@/views/charts'),
        name: 'BarChartRace',
        meta: { title: 'Bar Chart Race', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'flow',
        component: () => import('@/views/charts/flow'),
        name: 'BarChartFlow',
        meta: { title: 'Bar Chart Flow', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'flow/step',
        component: () => import('@/views/charts/flow-step'),
        name: 'BarChartFlowStep',
        hidden: true,
        meta: { title: 'Bar Chart Flow Step', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'demo',
        component: () => import('@/views/charts/demo'),
        name: 'BarChartDemo',
        meta: { title: 'Bar Chart Demo', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'sample/1',
        component: () => import('@/views/charts/sample1'),
        name: 'Sample1',
        meta: { title: 'Sample-1', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'sample/2',
        component: () => import('@/views/charts/sample2'),
        name: 'Sample2',
        meta: { title: 'Sample-2', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'sample/3',
        component: () => import('@/views/charts/sample3'),
        name: 'Sample3',
        meta: { title: 'Sample-3', icon: 'el-icon-pie-chart' }
      }
    ]
  },

  {
    path: '/chart/race',
    component: () => import('@/views/charts'),
    hidden: true
  },
  {
    path: '/chart/flow',
    component: () => import('@/views/charts/flow'),
    hidden: true
  },

  {
    path: '/widgets',
    component: Layout,
    meta: { title: 'Widgets', icon: 'el-icon-pie-chart' },
    children: [
      {
        path: '',
        component: () => import('@/views/widgets'),
        name: 'CircleMenu',
        meta: { title: 'Circle Menu', icon: 'el-icon-pie-chart' }
      }
    ]
  },

  {
    path: '/demos',
    component: Layout,
    meta: { title: 'Demos', icon: 'example' },
    children: [
      {
        path: '',
        component: () => import('@/views/demo'),
        name: 'DemoDownload',
        meta: { title: 'Download', icon: 'el-icon-pie-chart' }
      },
      {
        path: 'dropdown',
        component: () => import('@/views/demo/dropdown'),
        name: 'DemoDropdown',
        meta: { title: 'Dropdown', icon: 'example' }
      }
    ]
  },

  // {
  //   path: '/selector',
  //   component: Layout,
  //   meta: { title: 'Selector', icon: 'el-icon-finished' },
  //   redirect: '/selector/user',
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'UserSelector',
  //       component: () => import('@/views/selector/user'),
  //       meta: { title: 'User Selector', icon: 'el-icon-user-solid' }
  //     },
  //     {
  //       path: 'project',
  //       name: 'ProjectSelector',
  //       component: () => import('@/views/selector/project'),
  //       meta: { title: 'Project Selector', icon: 'el-icon-s-help' }
  //     }
  //   ]
  // },

  {
    path: '/scheduler',
    component: Layout,
    meta: { title: 'Scheduler', icon: 'el-icon-s-help' },
    children: [
      {
        path: '',
        name: 'SchedulerDhtmlx',
        component: () => import('@/views/scheduler'),
        meta: { title: 'DHTMLX Scheduler', icon: 'el-icon-s-help' }
      },
      {
        path: 'statistics',
        name: 'SchedulerStatistics',
        component: () => import('@/views/scheduler/samples/statistics-v2'),
        meta: { title: 'Scheduler Statistics', icon: 'el-icon-s-help' }
      },
      {
        path: 'booking',
        name: 'SchedulerBooking',
        component: () => import('@/views/scheduler/samples/booking-v2'),
        meta: { title: 'Scheduler Booking', icon: 'el-icon-s-help' },
        hidden: true
      }
    ]
  },

  {
    path: '/boardroom',
    redirect: '/boardroom/index',
    component: Layout,
    meta: { title: 'Boardroom', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'BoardroomStatistics',
        component: () => import('@/views/boardroom/statistics'),
        meta: { title: 'Statistics', icon: 'el-icon-s-help' }
      },
      {
        path: 'booking',
        name: 'BoardroomBooking',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: 'Booking', icon: 'el-icon-s-help' },
        hidden: true
      },
      {
        path: 'booking/my',
        name: 'BoardroomMyBooking',
        component: () => import('@/views/boardroom/components/view'),
        meta: { title: 'My Booking', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/components/plus',
    component: Layout,
    meta: { title: 'Components Plus', icon: 'el-icon-finished' },
    children: [
      {
        path: 'single/test',
        name: 'SingleTest',
        component: () => import('@/views/components-plus/selector/org/cases/case7'),
        meta: { title: 'Single Test', icon: 'example' }
      },
      {
        path: '',
        name: 'ComponentsPlus',
        component: () => import('@/views/components-plus'),
        meta: { title: 'Docs', icon: 'el-icon-user-solid' }
      },
      {
        path: 'selector/base',
        name: 'BasePaginationSelector',
        component: () => import('@/views/components-plus/selector/base'),
        meta: { title: 'Pagination Selector', icon: 'el-icon-user-solid' }
      },
      {
        path: 'selector/user',
        name: 'UserSelector',
        component: () => import('@/views/components-plus/selector/user'),
        meta: { title: 'User Selector', icon: 'el-icon-user-solid' }
      },
      {
        path: 'selector/project',
        name: 'ProjectSelector',
        component: () => import('@/views/components-plus/selector/project'),
        meta: { title: 'Project Selector', icon: 'el-icon-user-solid' }
      },
      {
        path: 'selector/org',
        name: 'OrgSelector',
        component: () => import('@/views/components-plus/selector/org'),
        meta: { title: 'Org Selector', icon: 'el-icon-grape' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
