import axios from './interceptor.js'


// 检查用户名是否重名
export function apiGetCheckRename(username: string): Promise<any> {
    return axios.get('/user/check_rename', { username })
}