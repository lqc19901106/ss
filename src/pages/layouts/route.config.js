const BasicRouteConfig = [
  {
    name: 'login',
    url: '/login',
    hide: true
  },
  {
    name: 'authorized',
    url: '/403',
    hide: true
  },
  {
    name: 'notFound',
    url: '/404',
    hide: true
  }
];

const MainRouteConfig = [
  {
    label: '机构列表',
    name: 'organizationList',
    url: '/main/organizationList',
    authorized: [1,2,3,4],
    icon: ''
  },
  {
    label: '系统管理',
    name: 'organizationManage',
    authorized: [1,2],
    children: [
      {
        label: '机构管理',
        name: 'organizationManage',
        url: '/main/organizationManage',
        authorized: [1,2],
        icon: ''
      },
      {
        label: '用户管理',
        name: 'userManage',
        url: '/main/userManage',
        authorized: [1,2],
        icon: ''
      }
    ]
  }
];

const SubRouteConfig = [
  {
    label: '检查信息',
    authorized: [1,2,3,4],
    children: [
      { label: '检查列表', name: 'studylist', url: '/sub/studylist', authorized: [1, 2, 3,4]},
      { label: '上传', name: 'upload', url: '/sub/upload', authorized: [1, 2, 3, 4]}
    ]
  },
  {
    label: '统计信息',
    authorized: [1,2],
    children: [
      { label: '点击率统计', name: 'click', url: '/sub/click', authorized: [1,2] },
      { label: '预测服务统计', name: 'prediction', url: '/sub/prediction', authorized: [1,2] }
    ]
  },
  {
    label: '监控信息',
    authorized: [1,2],
    children: [
      { label: '服务监控', name: 'service', url: '/sub/service', authorized: [1,2] },
      { label: '网络监控', name: 'network', url: '/sub/network', authorized: [1,2] },
      { label: '硬件监控', name: 'hardware', url: '/sub/hardware', authorized: [1,2] }
    ]
  },
  {
    label: '配置管理',
    authorized: [1,2],
    children: [
      { label: '全局配置', name: 'config/global', url: '/sub/config/global', authorized: [1,2] },
      { label: '肺结节配置', name: 'config/lung', url: '/sub/config/lung', authorized: [1,2] }
    ]
  }
];

export { BasicRouteConfig, MainRouteConfig, SubRouteConfig };
