<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
	console.log('App Launch');
});
onShow(() => {
	console.log('App Show');
});
onHide(() => {
	
	// 关闭动态监测主题模式
	uni.$off('changeTheme');

	console.log('App Hide');
});
</script>
<style></style>
