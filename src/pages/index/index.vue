<template>
	<view class="container">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>

		<!-- 这里是导航栏 -->
		<view class="nav">
			<NavigationBar></NavigationBar>
		</view>

		<!-- 这里是内容栏 -->
		<view class="content">
			<HeroList></HeroList>
		</view>

		<!-- 这里是页脚 -->
		<view class="foot">
			<Foot></Foot>
		</view>
	</view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import HeroList from '@/components/HeroList.vue';
import Foot from '@/components/Foot.vue';
</script>

<style scoped lang="scss">
.container {
	height: 100vh;
	width: 100vw;
	overflow: hidden;

	.status_bar {
		height: var(--status-bar-height);
		min-height: var(--status-bar-height);
		width: 100%;
	}

	.nav {
		height: 60px;
		border-bottom: 1px solid #d4d4d4;
	}

	.content {
		max-height: calc(100vh - 120px - var(--status-bar-height));
		height: calc(100vh - 120px - var(--status-bar-height));
	}

	.foot {
		height: 60px;
		border-top: 1px solid #d4d4d4;
	}
}
</style>
