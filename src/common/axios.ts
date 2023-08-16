
import axios from './interceptor.js'


//设置请求前拦截器
axios.interceptor.request = (config : any) => {
	//添加通用参数

}
//设置请求结束后拦截器
axios.interceptor.response = (response : any) => {
	//判断返回状态 执行相应操作
	return response;
}

export default axios