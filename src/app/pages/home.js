export default [
  {
    path: '/',
    exact: true,
    component: () => import('../containers/home/index'),
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Implementing Auth with ReactPWA is simple. Check out this fake auth example for more details',
    },
    routes: [
      {
        path: '/articles',
        exact: true,
        component: () => import('../containers/articles/index'),
        seo: {
          title: 'Auth | ReactPWA Demo',
          description: 'Implementing Auth with ReactPWA is simple. Check out this fake auth example for more details',
        },
      },
    ]
  },
]
