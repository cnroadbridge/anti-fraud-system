import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

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
  }

]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', roles: ['admin', 'receiver', 'receiver2', 'operator', 'operator2', 'operator3', 'operator4'] }
    }]
  },

  {
    path: '/alarm-receive',
    component: Layout,
    redirect: '/alarm-receive/input',
    name: 'AlarmReceive',
    meta: { title: '接警', icon: 'el-icon-phone-outline', roles: ['admin', 'receiver', 'receiver2'] },
    children: [
      {
        path: 'input',
        name: 'Input',
        component: () => import('@/views/alarm-receive/input'),
        meta: { title: '警情录入', icon: 'el-icon-document', roles: ['admin', 'receiver', 'receiver2'] }
      },
      {
        path: 'audit',
        name: 'Audit',
        component: () => import('@/views/alarm-receive/audit'),
        meta: { title: '警情审核', icon: 'el-icon-s-check', roles: ['admin', 'receiver'] }
      }
    ]
  },

  {
    path: '/assistance-investigation',
    component: Layout,
    redirect: '/assistance-investigation/control-check-bank',
    name: 'AssistanceInvestigation',
    meta: { title: '协查', icon: 'el-icon-view', roles: ['admin', 'operator', 'operator2', 'operator3', 'operator4'] },
    children: [
      {
        path: 'control-check-bank',
        name: 'ControlCheckBank',
        component: () => import('@/views/assistance-investigation/control-check-bank/index'),
        meta: { title: '银行查控', icon: 'el-icon-bank-card', roles: ['admin', 'operator'] }
      },
      {
        path: 'control-check-mobie',
        name: 'ControlCheckMobie',
        component: () => import('@/views/assistance-investigation/control-check-mobile/index'),
        meta: { title: '电话查控', icon: 'el-icon-mobile-phone', roles: ['admin', 'operator2'] }
      },
      {
        path: 'control-check-website',
        name: 'ControlCheckWebsite',
        component: () => import('@/views/assistance-investigation/control-check-website/index'),
        meta: { title: '网站查控', icon: 'el-icon-monitor', roles: ['admin', 'operator3'] }
      },
      {
        path: 'control-check-account',
        name: 'ControlCheckAccount',
        component: () => import('@/views/assistance-investigation/control-check-account/index'),
        meta: { title: '虚拟账号查控', icon: 'el-icon-sunrise', roles: ['admin', 'operator4'] }
      }
    ]
  },

  {
    path: '/manage-system',
    component: Layout,
    redirect: '/manage-system/manage-user',
    name: 'ManageSystem',
    meta: { title: '系统管理', icon: 'el-icon-setting', roles: ['admin'] },
    children: [
      {
        path: 'manage-user',
        name: 'ManageUser',
        component: () => import('@/views/manage-system/manage-user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] }
      },
      {
        path: 'maintenance-card-type',
        name: 'MaintenanceCardType',
        component: () => import('@/views/manage-system/maintenance-card-bank/index'),
        meta: { title: '银行卡维护', icon: 'el-icon-bank-card', roles: ['admin'] }
      },
      {
        path: 'alarm-category-type',
        name: 'AlarmCategoryType',
        component: () => import('@/views/manage-system/maintenance-alarm-category/index'),
        meta: { title: '警情类别维护', icon: 'el-icon-tickets', roles: ['admin'] }
      },
      {
        path: 'affiliation',
        name: 'Affiliation',
        component: () => import('@/views/manage-system/affiliation/index'),
        meta: { title: '所属机构', icon: 'el-icon-s-flag', roles: ['admin'] }
      },
      {
        path: 'analysis-statistical',
        name: 'AnalysisStatistical',
        component: () => import('@/views/manage-system/analysis-statistical/index'),
        meta: { title: '统计分析', icon: 'el-icon-s-data', roles: ['admin'] }
      },
      {
        path: 'export-data',
        name: 'ExportData',
        component: () => import('@/views/manage-system/export-data/index'),
        meta: { title: '数据导出', icon: 'el-icon-search', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
