/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component : DefineComponent<{}, {}, any>;
	export default component;
}

declare module '*.js' {

	interface Interceptor {
		config : {
			baseUrl : string,
			headers : object,
			dataType : string,
			responseType : string
		},
		interceptor : any,
		request(options : undefined | object) : Promise<any>,
		get(url : string, data : object, options ?: undefined | object) : Promise<any>,
		post(url : string, data : object, options ?: undefined | object) : Promise<any>,
		put(url : string, data : object, options ?: undefined | object) : Promise<any>,
		delete(url : string, data : object, options ?: undefined | object) : Promise<any>,
	}

	const interceptor : Interceptor

	export default interceptor
}

// 英雄大乱斗平衡
type Balance = {
	'cause-damage' : number;
	'toughness' : number;
	'skill-haste' : number;
	'attack-speed-increase-and-growth' : number;
	'take-damage' : number;
	'treatment-effect' : number;
	'shield-effect' : number;
	'resource-recovery' : number;
	'special-abilities' : string
};