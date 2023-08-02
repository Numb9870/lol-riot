/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component : DefineComponent<{}, {}, any>;
	export default component;
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
};