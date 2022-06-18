import { MainLayout } from './layouts';
import Home from './views/Home';
import Urls from './views/Urls';
import Redirecter from './views/Redirecter';
import notFound from './views/NotFound';

const routes = [
  {
    path: '/',
    layout: MainLayout,
    component: Home
  },
  {
    path: '/Urls',
    layout: MainLayout,
    component: Urls
  },
  {
    path: '/404',
    layout: MainLayout,
    component: notFound
  },
  {
    path: '/:id',
    layout: MainLayout,
    component: Redirecter
  }
];

export default routes;
