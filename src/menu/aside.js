// 菜单 侧边栏
export default [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    title: '渠道报表系统',
    icon: 'file-text-o ',
    children: [{
        path: '/admin/CPA',
        title: 'CPA日报'
      },
      {
        path: '/admin/CPS',
        title: 'CPS日报'
      },
    ]
  }
]