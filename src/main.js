import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './styles/reset.css'
import 'amfe-flexible'
import 'vant/lib/index.less';
import './assets/iconfont/iconfont.css'
import { Cascader, DatetimePicker, Image as VanImage, ActionSheet, Dialog, ImagePreview, Popup, PullRefresh, Sticky, List, NavBar, Form, Field, Button, Icon, Toast, CountDown, Tabbar, TabbarItem, Grid, GridItem, Cell, CellGroup, Search, Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Cascader)
Vue.use(DatetimePicker)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(ImagePreview)
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(Sticky);
Vue.use(List);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(CountDown)
Vue.use(Toast);
Vue.use(Button)
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Icon)
Vue.use(ActionSheet)
// const IconFont = Icon.createFromIconfontCN({

// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
