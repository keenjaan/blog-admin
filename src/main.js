/* eslint-disable */
import Vue          from 'vue';
import ElementUi    from 'element-ui';
import App          from './App';
import 'element-ui/lib/theme-default/index.css';

import router       from './routes/index'
import store        from './store/index'
import './style/common.css';

Vue.use(ElementUi);

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false; // 禁止调试工具
  Vue.config.productionTip = false; // 禁止提示
} else {
  Vue.config.devtools = true;
  Vue.config.productionTip = true;
}

window.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})