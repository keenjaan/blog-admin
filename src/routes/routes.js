const notFound        = resolve => require(['components/not-found'], resolve);
const adminReg        = resolve => require(['components/backend/user/reg'], resolve);
const adminLogin      = resolve => require(['components/backend/user/login'], resolve);
const admin           = resolve => require(['components/backend/admin'], resolve);
const articleList     = resolve => require(['components/backend/article/list'], resolve);
const articleCreate   = resolve => require(['components/backend/article/create'], resolve);
const articleEdite    = resolve => require(['components/backend/article/edite'], resolve);
const classifyList    = resolve => require(['components/backend/classify/list'], resolve);

export default [
  {
    path: '/',
    component: adminLogin
  },
  {
    path: '/admin',
    component: admin,
    children: [
      {
        path: 'article-list',
        component: articleList
      },
      {
        path: 'article-create',
        component: articleCreate
      },
      {
        path: 'article-edite',
        component: articleEdite
      },
      {
        path: 'classify-list',
        component: classifyList
      }
    ]
  },
  {
    path: '/admin/reg',
    component: adminReg
  },
  {
    path: '/admin/login',
    component: adminLogin
  },
  {
    path:'*',
    component: notFound
  }
];
