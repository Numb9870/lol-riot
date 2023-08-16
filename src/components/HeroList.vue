<template>
	<scroll-view class="scroll-container" :scroll-top="scrollTop" scroll-y>
		<uni-list class="list-container" :class="theme">
			<uni-list-item v-for="(item, index) in heroList" :key="index" :note="item['hero-name']" :time="item.version" :class="theme">
				<!-- 自定义 header-->
				<template v-slot:header :class="theme">
					<image class="slot-image" :src="item.img" mode="widthFix" :alt="item['hero-name']"></image>
				</template>
				<!-- 自定义 body-->
				<template v-slot:body :class="theme">
					<view class="slot-box" :class="theme">
						<view class="slot-text-info" :class="theme">
							<p>{{ item['hero-name'] }}</p>
							<p style="color: #464caa; font-size: 0.5rem">{{ item['version'] }}</p>
						</view>
						<view class="slot-text" :class="theme">
							<p :style="formatColor1(item.balance['cause-damage'])">造成伤害：{{ item.balance['cause-damage'] == 0 ? '0' : `${item.balance['cause-damage']}` }}</p>
							<p :style="formatColor2(item.balance['toughness'])">韧性：{{ item.balance['toughness'] == 0 ? '0' : `${item.balance['toughness']}` }}</p>
							<p :style="formatColor2(item.balance['skill-haste'])">技能急速：{{ item.balance['skill-haste'] == 0 ? '0' : `${item.balance['skill-haste']}` }}</p>
							<p :style="formatColor2(item.balance['attack-speed-increase-and-growth'])">
								攻速增加增长：{{ item.balance['attack-speed-increase-and-growth'] == 0 ? '0' : `${item.balance['attack-speed-increase-and-growth']}` }}
							</p>
							<p :style="formatColor3(item.balance['take-damage'])">承受伤害：{{ item.balance['take-damage'] == 0 ? '0' : `${item.balance['take-damage']}` }}</p>
							<p :style="formatColor1(item.balance['treatment-effect'])">
								治疗效果：{{ item.balance['treatment-effect'] == 0 ? '0' : `${item.balance['treatment-effect']}` }}
							</p>
							<p :style="formatColor1(item.balance['shield-effect'])">
								护盾效果：{{ item.balance['shield-effect'] == 0 ? '0' : `${item.balance['shield-effect']}` }}
							</p>
							<p :style="formatColor2(item.balance['resource-recovery'])" v-if="item.balance['resource-recovery'] !== 0">
								施法资源恢复：{{ item.balance['resource-recovery'] }}
							</p>
							<p style="color: #08deff" v-if="item.balance['special-abilities'] !== ''">专属平衡：{{ item.balance['special-abilities'] }}</p>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</scroll-view>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import heros from '@/store/heros.json';

// 滚动条出现的位置
const scrollTop = ref(0);
const heroList = reactive<typeof heros>([]);
const theme = ref('');

onBeforeMount(() => {
	// #ifdef APP-PLUS
	uni.getSystemInfoSync().theme == 'light' ? (theme.value = 'light') : (theme.value = 'dark');
	// #endif
	heros.map((item) => {
		heroList.push(item);
	});
});

// 搜索栏发生变化或提交搜索栏  jianmo，yasuo
uni.$on('searchValueChange', function (data) {
	
	// 多个查询（仅支持符号 ','、'，' ）
	if (data.value.split(',').length > 1) {
		heroList.length = 0;
		data.value.split(',').map((s: string) => {
			const reg = new RegExp(`^${s}`, 'ig');
			heros.map((item) => {
				item.alias.map((i) => {
					if (reg.test(i)) {
						// 数组去重
						if (!heroList.some((e) => e['hero-name'] === item['hero-name'])) {
							heroList.push(item);
						}
					}
				});
			});
		});
	} else if (data.value.split('，').length > 1) {
		heroList.length = 0;
		data.value.split('，').map((s: string) => {
			const reg = new RegExp(`^${s}`, 'ig');
			heros.map((item) => {
				item.alias.map((i) => {
					if (reg.test(i)) {
						// 数组去重
						if (!heroList.some((e) => e['hero-name'] === item['hero-name'])) {
							heroList.push(item);
						}
					}
				});
			});
		});
	} else {
		heroList.length = 0;
		const reg = new RegExp(`^${data.value}`, 'ig');
		heros.map((item) => {
			item.alias.map((i) => {
				if (reg.test(i)) {
					// 数组去重
					if (!heroList.some((e) => e['hero-name'] === item['hero-name'])) {
						heroList.push(item);
					}
				}
			});
		});
	}
});

// 清除搜索值
uni.$on('searchValueClear', function () {
	heroList.length = 0;
	heros.map((item) => {
		heroList.push(item);
	});
});

// 高于100显示绿色，低于100显示红色，等于0显示灰色
const formatColor1 = (item: any) => {
	if (item == 0) {
		return `color:#737373`;
	} else if (item > 100) {
		return `color:green`;
	} else if (item < 100) {
		return `color:red`;
	}
};

// 高于0显示绿色，低于0显示红色，等于0显示灰色
const formatColor2 = (item: any) => {
	if (item == 0) {
		return `color:#737373`;
	} else if (item > 0) {
		return `color:green`;
	} else if (item < 0) {
		return `color:red`;
	}
};

// 高于100显示红色，低于100显示绿色，等于0显示灰色
const formatColor3 = (item: any) => {
	if (item == 0) {
		return `color:#737373`;
	} else if (item > 100) {
		return `color:red`;
	} else if (item < 100) {
		return `color:green`;
	}
};
</script>

<style scoped lang="scss">
.scroll-container {
	height: 100%;

	// header插槽
	.slot-image {
		width: 60px;
		height: 60px;
		overflow: hidden;
	}

	// body插槽
	.slot-box {
		width: 100%;
		margin-left: 10px;

		.slot-text-info {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		.slot-text {
			width: 100%;
		}
	}
}

.light {
	color: black !important;
	background-color: #ffffff !important;
}

.dark {
	color: white !important;
	background-color: #292929 !important;
}

p {
	display: inline-block;
	margin-right: 8px;
}
</style>
