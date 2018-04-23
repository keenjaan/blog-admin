import Vue    from 'vue';
import axios  from 'axios';


class Core {
  constructor (vue) {
    this.vue    = vue;
    this.beforeAjax();
    this.afterAjax();
  }
  beforeAjax () {
    axios.interceptors.request.use(function (config) {
      config.headers['authorization'] = window.localStorage.getItem('token') || '';
      // config.headers['Content-Type'] = 'application/json; charset = utf-8';
      return config;
    }, function (err) {
      return Promise.reject(err);
    });   
  }
  afterAjax () {
    axios.interceptors.response.use((res) => {
      if (res.data.code === 401) {
        console.log(this.vue);
        window.app.$notify({
          title: '警告',
          message: '请登录后重试！',
          type: 'warning'
        });
        window.app.$router.push({path: '/admin/login'});
      }
      return res.data;
    }, (err) => {
      return Promise.reject(err);
    });
  }
  get (url, option) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: option
      }).then(resolve, reject);
    });
  }
  post (url, option) {
    return new Promise((resolve, reject) => {
      axios.post(url, option).then(resolve, reject);
    });
  }
}

// window.$core = new Core(window);
Vue.prototype.$core         = new Core(Vue);