import ajax from "./ajax";
/* 用户注册 */
/* data数据
name	是	string	昵称
email	是	string	邮箱
password	是	string	密码
password_confirmation	是	string	确认密码

*/
export function reqRegister(data) {
    return ajax({
        url: '/api/auth/register',
        method: 'post',
        data,
    })
}
/* 用户登录 */
/* data数据
email	是	string	邮箱
password	是	string	密码
*/
export function reqLogin(data) {
    return ajax({
        url: '/api/auth/login',
        method: 'post',
        data,
    })
}

/* 退出登录 */
export function reqLoginOut(){
    return ajax({
        url:"/api/auth/logout",
        method:"post",
    })
}


/* 获取用户信息 */
export function reqUserInfo(){
    return ajax({
        url:'/api/user',
        method:"get",
    })
}