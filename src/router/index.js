import { createRouter, createWebHistory } from 'vue-router'

const cockpit = [
  {
    path: '/cockpit/dashboard',
    name: 'cockpit-dashboard',
    component: () => import('@/views/cockpit/dashboard/Dashboard.vue'),
    meta: { title: '驾驶舱' }
  },
  {
    path: '/cockpit/modalList',
    name: 'cockpit-modalList',
    component: () => import('@/views/cockpit/modalList/ModalList.vue'),
    meta: { title: '模型', menu: true }
  },
  {
    path: '/cockpit/processesList',
    name: 'cockpit-processesList',
    component: () => import('@/views/cockpit/processesList/ProcessesList.vue'),
    meta: { title: '流程', menu: true }
  },
  // {
  //   path: '/cockpit/decisions',
  //   name: 'cockpit-decisions',
  //   component: () => import('@/views/cockpit/decisions/Decisions.vue'),
  //   meta: { title: '决策', menu: true }
  // },
  // {
  //   path: '/cockpit/tasks',
  //   name: 'cockpit-tasks',
  //   component: () => import('@/views/cockpit/tasks/Tasks.vue'),
  //   meta: { title: '人工任务', menu: true }
  // },
  // {
  //   path: '/cockpit/deployment',
  //   name: 'cockpit-deployment',
  //   component: () => import('@/views/cockpit/deployment/Deployment.vue'),
  //   meta: { title: '部署', menu: true }
  // },

  {
    path: '/cockpit/process-definition',
    name: 'cockpit-processes-definition',
    component: () => import('@/views/cockpit/processesDefinition/ProcessesDefinition.vue')
  },

]

const tasklist = [
  {
    path: '/tasklist',
    name: 'tasklist',
    component: () => import('@/views/tasklist/Main.vue'),
    meta: { title: '驾驶舱' }
  }
]

export const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'welcome',
        component: () => import('@/views/welcome/Welcome.vue'),
        meta: { title: '首页', affix: true }
      },
      ...cockpit,
      ...tasklist
    ]
  },
  {
    path: '/cockpit/process',
    name: 'cockpit-process',
    component: () => import('@/views/process/Process.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
