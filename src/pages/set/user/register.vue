<template>
	<view class="register-container">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<!-- 这里是返回按键 -->
		<view class="register-nav">
			<uni-icons class="register-back" type="arrow-left" size="30" @click="backSetPage"></uni-icons>
			<view class="register-back-text" @click="backSetPage">返回</view>
		</view>
		<view class="register-content">
			<uni-forms ref="valiForm" :model="userInfo" label-position="top" validateTrigger="blur">
				<uni-forms-item label="账户名" required name="username">
					<uni-easyinput type="text" v-model="userInfo.username" placeholder="请输入账户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput type="password" v-model="userInfo.password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label="验证密码" required name="rePassword">
					<uni-easyinput type="password" v-model="userInfo.rePassword" placeholder="请再次输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button class="register-btn" type="primary" @click="submit(valiForm)">注册</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { apiGetCheckRename } from "@/common/api"

// 表单ref
const valiForm = ref();

// 表单信息
type UserInfo = {
	username: string;
	password: string | Number;
	rePassword: string | Number;
};
const userInfo = ref<UserInfo>({
	username: '',
	password: '',
	rePassword: ''
});
const registrableUsername = ref('');

// 需要在onReady中设置规则
onReady(() => {
	valiForm.value.setRules(rules);
});

// 使用自定义表单验证
const rules = {
	username: {
		rules: [
			{
				required: true,
				errorMessage: '账户名不能为空'
			},
			{
				validateFunction: async function (rule: any, value: any, data: any, callback: any) {
					return new Promise((resolve: any, reject: any) => {
						apiGetCheckRename(userInfo.value.username)
							.then((res) => {
								if (res.data.code === 0) {
									resolve();
								} else {
									reject(new Error('该账号名已被注册'));
								}
							})
							.catch((err) => {
								reject(new Error('网络请求失败，无法确定该账户名是否可用。'));
							});
					});

					// 检测用户名是否可用
					// uni.request({
					// 	url: 'http://127.0.0.1:3000/user/check_rename',
					// 	data: {
					// 		username: userInfo.value.username
					// 	},
					// 	success: (res: any) => {
					// 		console.log(res.data);
					// 	}
					// });
				}
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '密码不能为空'
			},
			{
				pattern: new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,10}$', 'g'),
				errorMessage: '必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间'
			}
		]
	},
	rePassword: {
		rules: [
			{
				required: true,
				errorMessage: '两次密码不同，请重新检查后再提交'
			},
			{
				validateFunction: function (rule: any, value: any, data: any, callback: any) {
					if (userInfo.value.password === userInfo.value.rePassword) {
						return true;
					} else {
						callback('两次密码不同，请重新检查后再提交');
					}
				}
			}
		]
	}
};

// 提交表单
const submit = () => {
	valiForm.value
		.validate()
		.then((res) => {
			console.log('表单数据信息：', res);
		})
		.catch((err) => {
			console.log('表单错误信息：', err);
		});
};

// 返回设置页面
const backSetPage = () => {
	uni.navigateBack();
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

	.register-content {
		margin-top: 25px;
		margin-left: 10px;
		margin-right: 10px;

		.register-btn {
			margin-top: 40px;
			width: 100px;
		}
	}
}
</style>
