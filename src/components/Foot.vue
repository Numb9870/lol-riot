<template>
	<view class="foot-container">
		<view class="foot-item" @click="viewToHeroList">
			<uni-icons class="title" type="staff-filled" size="20"></uni-icons>
			<view class="title">
				英雄
			</view>
		</view>
		<view class="foot-item" @click="viewToChat">
			<uni-icons class="title" type="chatbubble-filled" size="20"></uni-icons>
			<view class="title">
				聊天
			</view>
		</view>
		<view class="foot-item" @click="viewToSet">
			<uni-icons class="title" type="settings-filled" size="20"></uni-icons>
			<view class="title">
				设置
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	const viewToHeroList = () => {

	}

	const viewToChat = () => {
		uni.showToast({
			title: "偷懒还没做，嘻嘻😳",
			icon: "none"
		})
	}

	const viewToSet = () => {
		uni.showToast({
			title: "偷懒还没做，嘻嘻😳",
			icon: "none"
		})
	}
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
	}
</style>