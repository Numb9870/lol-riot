<template>
	<view class="register-container">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<!-- 这里是返回按键 -->
		<view class="register-nav" @click="backSetPage">
			<uni-icons class="register-back" type="arrow-left" size="30"></uni-icons>
			<view class="register-back-text">返回</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	
// 返回设置页面
const backSetPage = () => {
	uni.navigateBack()
};
</script>

<style scoped lang="scss">
.register-container {
	.status_bar {
		height: var(--status-bar-height);
		min-height: var(--status-bar-height);
		width: 100%;
	}
	.register-nav {
		width: 100%;
		height: 59px;
		border-bottom: 1px solid #d4d4d4;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.register-back {
			margin-left: 10px;
			.register-back-text {
				font-size: 2rem;
			}
		}
	}
}
</style>
