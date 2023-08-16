<template>
	<view class="chat-container">
		<button @click="sendMessage">发送信息</button>
	</view>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { GlobalConfig } from '../common/config';

console.log(process.env.NODE_ENV);

// websocket地址
const url = computed(() => {
	return process.env.NODE_ENV === 'development' ? GlobalConfig.devWSAddress : GlobalConfig.proWSAddress;
});

onBeforeMount(() => {
	uni.getNetworkType({
		success: function (res) {
			console.log(res.networkType);
		}
	});
	console.log(url.value);
});

const socketOpen = ref(false);

// 连接服务器
const socketTask = uni.connectSocket({
	url: GlobalConfig.devWSAddress,
	fail: () => {
		uni.showToast({
			title: '当前服务器繁忙,请稍后再试。',
			duration: 2000,
			icon: 'none'
		});
	}
});
// 连接成功
uni.onSocketOpen(function () {
	socketOpen.value = true;
});
// 连接失败
uni.onSocketError(function () {
	uni.getNetworkType({
		success: function (res) {
			if (res.networkType == 'none') {
				uni.showToast({
					title: '本地网络连接失败。请打开数据流量或连接wifi后再重新连接',
					duration: 3000,
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '当前服务器繁忙,请稍后再试。',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		fail: function () {
			uni.showToast({
				title: '查询本地网络失败。请稍后重试',
				duration: 3000,
				icon: 'none'
			});
		}
	});
});
// 监听WebSocket接受到服务器的消息事件
uni.onSocketMessage(function (res) {
	const serveMessage = JSON.parse(res.data);
	console.log('收到服务器内容：');
	console.log(serveMessage);
});

const sendMessage = async () => {
	console.log(socketOpen.value);
	socketTask.send({
		data: 'nihao',
		success() {
			console.log('发送成功');
		},
		fail: () => {
			console.log('发送失败');
		}
	});
};
</script>

<style scoped lang="scss">
.chat-container {
	width: 100%;
	height: 100%;
}
</style>
