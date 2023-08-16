<template>
	<view>
		<!-- 当type为Main时展示此导航 -->
		<view v-if="type == 'Main'" class="nav-container">
			<!-- 这里是logo -->
			<view class="nav-item nav-item-logo t-icon t-icon-LOL-baidi"></view>
			<!-- 这里是搜索框 -->
			<uni-search-bar
				class="uni-input"
				v-model="searchValue"
				@input="input"
				@confirm="search"
				@clear="clear"
				@focus="focus"
				cancelButton="none"
				placeholder="支持英雄的名称/别称/缩写/简写/拼音"
			></uni-search-bar>
		</view>
		<!-- 当type为Chat时展示此导航 -->
		<view v-if="type == 'Chat'" class="nav-container">
			<h3>聊天室({{ onlineCount }})</h3>
		</view>
		<!-- 当type为Set时展示此导航 -->
		<view v-if="type == 'Set'" class="nav-container">
			<h3>设置</h3>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';

// 获取当前路由
const pages = getCurrentPages();
const page = pages[pages.length - 1];

onUnmounted(() => {
	uni.$off('searchValueChange');
	uni.$off('searchValueConfirm');
	uni.$off('searchValueClear');
});
// 展示nav的类型
const type = computed(() => {
	const _route = page.route!.split('/')[1];
	if (_route == 'index') {
		return 'Main';
	} else if (_route == 'chat') {
		return 'Chat';
	} else if (_route == 'set') {
		return 'Set';
	}
});
// 在线人数
const onlineCount = ref(100);

/* *********************输入框事件********************** */
const searchValue = ref('');
// uniSearchBar 的 value 改变时触发事件
const input = (e: any) => {
	if (e == '') {
		uni.$emit('searchValueClear');
	} else {
		uni.$emit('searchValueChange', { value: e });
	}
};
// uniSearchBar 的输入框 confirm 事件
const search = (e: any) => {
	uni.$emit('searchValueChange', { value: e.value });
};
// uniSearchBar 获取焦点时触发事件
const focus = () => {
	uni.showToast({
		title: '多个查找用","或"，"隔开(中英符号都可)',
		icon: 'none',
		duration: 2500
	});
};
// 点击清除按钮时触发事件
const clear = (e: any) => {
	uni.$emit('searchValueClear');
};
</script>

<style scoped lang="scss">
.nav-container {
	height: 60px;
	margin: 0 10px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	.nav-item-logo {
		width: 2rem;
		height: 2rem;
	}

	.uni-input {
		width: 85%;
	}

	.h3 {
		height: 60px;
		padding: 0;
	}
}
</style>
