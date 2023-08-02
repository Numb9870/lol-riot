import { createSSRApp } from "vue";
import App from "./App.vue";

import '@/static/css/main.css'
import '@/static/iconFont/iconfont.css'

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}