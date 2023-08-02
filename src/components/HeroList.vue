<template>
	<scroll-view class="scroll-container" :scroll-top="scrollTop" scroll-y>
		<uni-list class="list-container">
			<uni-list-item v-for="(item, index) in heroList" :key="index" :note="item['hero-name']" :time="item.version">
				<!-- 自定义 header-->
				<template v-slot:header>
					<image class="slot-image" :src="item.img" mode="widthFix" :alt="item['hero-name']"></image>
				</template>
				<!-- 自定义 body-->
				<template v-slot:body>
					<view class="slot-box">
						<view class="slot-text-info">
							<p>{{ item['hero-name'] }}</p>
							<p style="color: #464caa; font-size: 0.5rem">{{ item['version'] }}</p>
						</view>
						<view class="slot-text">
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
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</scroll-view>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';
import heros from '@/store/heros.json';

// 滚动条出现的位置
const scrollTop = ref(0);
const heroList = reactive<typeof heros>([]);

onBeforeMount(() => {
	heros.map((item) => {
		heroList.push(item);
	});
});

// 搜索栏发生变化
uni.$on('searchValueChange', function (data) {
	heroList.length = 0;
	const reg = new RegExp(`^${data.value}`, 'ig');
	heros.map((item) => {
		item.alias.map((i) => {
			if (reg.test(i)) {
				// 数组去重
				if(!heroList.some(e=> e['hero-name'] === item['hero-name'])){
					heroList.push(item)
				}
			}
		});
	});
});

// 搜索值提交
uni.$on('searchValueConfirm', function (data) {
	heroList.length = 0;
	const reg = new RegExp(`^${data.value}`, 'ig');
	heros.map((item) => {
		item.alias.map((i) => {
			if (reg.test(i)) {
				// 数组去重
				if(!heroList.some(e=> e['hero-name'] === item['hero-name'])){
					heroList.push(item)
				}
			}
		});
	});
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

p {
	display: inline-block;
	margin-right: 8px;
}
</style>
