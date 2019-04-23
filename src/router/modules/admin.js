import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/admin',
  name: 'admin',
  meta,
  redirect: { name: 'admin-CPA' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'CPA', name: `${pre}CPA`, component: () => import('@/pages/admin/CPA'), meta: { ...meta, title: 'CPA日报' } },
    { path: 'CPS', name: `${pre}CPS`, component: () => import('@/pages/admin/CPS'), meta: { ...meta, title: 'CPS日报' } },
  ])('demo-')
}
