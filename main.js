import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// main.js，注意要在use方法之后执行
import uView from "uview-ui";
Vue.use(uView);


import filters from "./common/filters.js";
for (let key in filters) {
	Vue.filter(key, filters[key])
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
