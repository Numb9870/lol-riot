<template>
	<view class="nav-container">
		<!-- 这里是logo -->
		<view class="nav-item nav-item-logo t-icon t-icon-LOL-baidi"></view>

		<!-- 这里是搜索框 -->
		<uni-search-bar
			class="uni-input"
			v-model="searchValue"
			@input="input"
			@confirm="search"
			@clear="clear"
			cancelButton="none"
			placeholder="可搜英雄的名字/别称/缩写/简写/拼音"
		></uni-search-bar>
	</view>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

onUnmounted(() => {
	uni.$off('searchValueChange');
	uni.$off('searchValueConfirm');
	uni.$off('searchValueClear');
});

/* *********************输入框事件********************** */
const searchValue = ref('');

const input = (e: any) => {
	// uniSearchBar 的 value 改变时触发事件
	if (e == '') {
		uni.$emit('searchValueClear');
	} else {
		uni.$emit('searchValueChange', { value: e });
	}
};

const search = (e: any) => {
	// uniSearchBar 的输入框 confirm 事件
	uni.$emit('searchValueConfirm', { value: e.value });
};

const clear = (e: any) => {
	// 点击清除按钮时触发事件
	uni.$emit('searchValueClear');
};
</script>

<style scoped lang="scss">
.nav-container {
	margin: 0 10px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	.uni-input {
		width: 85%;
	}
}
</style>
