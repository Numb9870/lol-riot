<template>
	<view class="set-container">
		<view class="user-container">
			<view class="user-container-left">
				<view class="avatar">
					<view class="t-icon t-icon-haoyou"></view>
				</view>
			</view>
			<view class="user-container-right">
				<button class="register-btn" plain @click="register">注册</button>
				<button class="register-btn" plain @click="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">

// 前往注册 1690539578705402494 __DC_STAT_UUID
const register = () => {
	uni.navigateTo({
		url: '/pages/set/user/register',
		animationType: 'pop-in',
		animationDuration: 200
	});
};
// 前去登陆
const login = () => {
	uni.navigateTo({
		url: '/pages/set/user/login',
		animationType: 'pop-in',
		animationDuration: 200
	});
};
</script>

<style scoped lang="scss">
.set-container {
	display: flex;

	.user-container {
		height: 98px;
		width: calc(100vw - 3px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #aa2eba;

		.user-container-left {
			margin-left: 10px;
			
			.avatar {
				width: 100px;
				height: 98px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.t-icon-haoyou {
					width: 3rem;
					height: 3rem;
				}
			}
		}

		.user-container-right {
			margin-right: 20px;
			display: flex;

			.register-btn {
				border: 0;
				text-decoration: underline;
			}
		}
	}
}
</style>
