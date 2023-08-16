<template>
	<view class="foot-container">
		<view class="foot-item" :class="{ 'index-active': index_active }" @click="viewToHeroList">
			<uni-icons class="title" :class="{ 'index-active': index_active }" type="staff-filled" size="20"></uni-icons>
			<view class="title">英雄</view>
		</view>
		<view class="foot-item" :class="{ 'chat-active': chat_active }" @click="viewToChat">
			<uni-icons class="title" :class="{ 'chat-active': chat_active }" type="chatbubble-filled" size="20"></uni-icons>
			<view class="title">聊天</view>
		</view>
		<view class="foot-item" :class="{ 'set-active': set_active }" @click="viewToSet">
			<uni-icons class="title" :class="{ 'set-active': set_active }" type="settings-filled" size="20"></uni-icons>
			<view class="title">设置</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(()=>{
	// 激活导航样式
	authPageActive()
})
// 激活的导航
const index_active = ref(false);
const chat_active = ref(false);
const set_active = ref(false);
// 获取当前路由
const pages = getCurrentPages();
const page = pages[pages.length - 1];
const currentPage = page.route!.split('/')[1];

// 跳转主页
const viewToHeroList = () => {
	authPage(currentPage, 'index');
};

// 跳转聊天室
const viewToChat = () => {
	authPage(currentPage, 'chat');
};

// 跳转设置
const viewToSet = () => {
	authPage(currentPage, 'set');
};

// 验证当前页面是否需要跳转
const authPage = (currentPage: string, toPage: string) => {
	if (currentPage == 'index' && toPage == 'index') {
		return false;
	} else if (currentPage == 'chat' && toPage == 'chat') {
		return false;
	} else if (currentPage == 'set' && toPage == 'set') {
		return false;
	} else {
		uni.navigateTo({
			url: `/pages/${toPage}/index`,
			animationType: 'fade-in',
			"animationDuration": 200
		});
	}
};
// 验证当前页面需要激活的导航
const authPageActive = () => {
	if (currentPage == 'index') {
		index_active.value = true;
		chat_active.value = false;
		set_active.value = false;
	} else if (currentPage == 'chat') {
		index_active.value = false;
		chat_active.value = true;
		set_active.value = false;
	} else if (currentPage == 'set') {
		index_active.value = false;
		chat_active.value = false;
		set_active.value = true;
	}
};
</script>

<style scoped lang="scss">
.foot-container {
	height: 60px;
	margin: 0 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.foot-item {
		display: flex;
		flex-wrap: wrap;

		.title {
			width: 100%;
			text-align: center;
		}
	}

	.index-active {
		color: #00aa7f !important;
	}
	.chat-active {
		color: #00aa7f !important;
	}
	.set-active {
		color: #00aa7f !important;
	}
}
</style>
