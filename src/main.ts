import { createSSRApp } from "vue";
import App from "./App.vue";
import axios from './common/interceptor.js'
import { GlobalConfig } from "./common/config"

import '@/static/css/main.css'
import '@/static/iconFont/iconfont.css'

// 设置拦截器baseUrl
process.env.NODE_ENV === 'development' ? (axios.config.baseUrl = GlobalConfig.devServeAddress) : (axios.config.baseUrl = GlobalConfig.proServeAddress)

export function createApp() {
	const app = createSSRApp(App);
	
	return {
		app,
	};
}
